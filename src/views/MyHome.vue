<template>
  <div class="container">
    <header class="Header">
      <button class="logout-btn" @click="Logout()">Sair</button>
      <span class="welcome-msg">Seja Bem Vindo, {{ username }}</span>
      <button @click="formedit()" class="edit-profile-btn">Editar Senha</button>
    </header>

    <div class="forum">
      <span class="username-span">@{{ username }}</span>
      <input v-model="Posts" type="text" id="comment" placeholder="Escreva seu comentário..." />
      <button class="comment-btn" @click="CreatePost()">Publicar</button>

      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </div>

    <div class="posts-list">
      <div v-for="post in posts" :key="post.id" class="post">
        <p><strong>{{ post.username }}:</strong> {{ post.content }}</p>
        <p><em>Publicado em: {{ formatDate(post.createdAt) }}</em></p>
        <button class="button-delete" @click="deletar(post.id)">excluir</button>
      </div>
    </div>
  </div>

  <div v-if="revel == true">
    <div class="overlay">
      <div class="Card">
        <button @click="revel = false" class="close-btn">X</button>
        <form @submit.prevent="AlterarUser">
          <label>Senha nova</label>
          <input type="password" v-model="NewPassword" />

          <label>Confirme a Senha</label>
          <input type="password" v-model="ConfirmPassword" />

          <button type="submit">Salvar</button>

          <div v-if=" errorMessageform" class="error">{{ errorMessageform}}</div>
          <div v-if="successMessage" class="success">{{ successMessage }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      Posts: '',
      errorMessageform:'',
      errorMessage: '',
      successMessage: '',
      posts: [],
      revel: false,
      NewPassword: '',
      ConfirmPassword: '',
    };
  },
  created() {
    this.loadUserInfo();
    this.loadPosts();
  },
  methods: {
    loadUserInfo() {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decodedToken = jwt_decode(token);
          this.username = decodedToken.username || 'Usuário';
        } catch (error) {
          console.error("Erro ao decodificar token", error);
        }
      }
    },

    async loadPosts() {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decodedToken = jwt_decode(token);
          const username = decodedToken.username;

          const response = await axios.get(`http://localhost:3000/post/${username}`);
          this.posts = response.data;
          this.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } catch (error) {
          console.error("Erro ao carregar posts:", error);
        }
      }
    },

    async CreatePost() {
      const token = localStorage.getItem('authToken');

      if (!token) {
        this.errorMessage = "Token de autenticação não encontrado!";
        return;
      }

      try {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.sub;

        if (!this.Posts.trim()) {
          this.errorMessage = "Por favor, escreva algo no campo de comentário.";
          return;
        }

        this.errorMessage = '';

        const response = await axios.post('http://localhost:3000/post', {
          content: this.Posts,
          userId: userId,
        });

        this.posts.push({
          id: response.data.id,
          username: this.username,
          content: this.Posts,
          createdAt: response.data.createdAt,
        });

        this.Posts = '';
      } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        this.errorMessage = "Erro ao publicar o post. Tente novamente.";
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR');
    },

    async Logout() {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          localStorage.removeItem("authToken");
          this.$router.push("/");
        } catch (error) {
          this.errorMessage = "Erro ao tentar deslogar";
        }
      }
    },
    async deletar(postId) {
      try {
        await axios.delete(`http://localhost:3000/post/${postId}`);
        this.posts = this.posts.filter(post => post.id !== postId);
      } catch (error) {
        console.error("Erro ao tentar deletar o post:", error);
        this.errorMessage = "Erro ao tentar deletar o post.";
      }
    },

    formedit() {
      this.revel = true;
    },

    async AlterarUser() {
      this.errorMessage = '';
      this.successMessage = '';

      if (!this.NewPassword) {
        this.errorMessage = "Você precisa colocar uma nova senha.";
        return;
      }

      if (this.NewPassword !== this.ConfirmPassword) {
        this.errorMessageform = 'As senhas não coincidem.';
        return;
      }

      const token = localStorage.getItem('authToken');
      if (!token) {
        this.errorMessageform= 'Token de autenticação não encontrado.';
        return;
      }

      try {
        const decodedToken = jwt_decode(token);
        const username = decodedToken.username;

        const data = {
          password: this.NewPassword,
          name: username,
        };

        const response = await axios.put('http://localhost:3000/user', data);

        if (response.status === 200) {
          this.successMessage = 'Senha atualizada com sucesso!';
        } else {
          this.errorMessageform = 'Erro ao atualizar a senha.';
        }
      } catch (error) {
        this.errorMessageform = 'Erro ao processar a solicitação. Tente novamente mais tarde.';
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.posts-list {
  background-color: #202024;
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.post {
  background-color: #2c2f36;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: white;
}

.post:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #202024;
  padding: 1.5rem 3rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.logout-btn,
.edit-profile-btn {
  padding: 0.8rem 1.5rem;
  background-color: #39FF14;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  transition: all 0.3s ease-in;
}

.logout-btn:hover,
.edit-profile-btn:hover {
  box-shadow: 0 0 12px rgba(57, 255, 20, 0.6);
  transform: scale(1.1);
}

.welcome-msg {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

.forum {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
  background-color: #202024;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

#comment {
  padding: 1rem;
  font-size: 1.1rem;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  border: 1px solid #39FF14;
  margin-top: 1rem;
  height: 6rem;
  resize: none;
  background-color: #333;
  color: white;
  outline: none;
  font-style: oblique;
}

.comment-btn {
  padding: 1rem 2rem;
  background-color: #39FF14;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  width: 12rem;
  font-size: 1.1rem;
  transition: background-color 0.3s;
  height: 3rem;
}

.comment-btn:hover {
  background-color: #39FF14;
  color: black;
}

.username-span {
  font-size: 1.5rem;
  font-weight: bold;
  color: #39FF14;
  background-color: #333;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-transform: capitalize;
}

.username-span:hover {
  background-color: #39FF14;
  color: black;
  cursor: pointer;
}

.error-message {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #ff4747;
  color: white;
  border-radius: 8px;
}

.button-delete {
  color: white;
  margin: 2rem;
  background-color: #ff4747;
  border-radius: 8px;
  width: 5rem;
  padding: 8px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
}

.Card {
  background-color: #202024;
  padding: 2rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 999;
  width: 300px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #39FF14;
}

input {
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #39FF14;
  border-radius: 4px;
  background-color: #2c2f36;
  outline: none;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: chartreuse;
}

.error {
  text-shadow: 0 0 5px red, 0 0 10px red, 0 0 15px red;
  color: red;
}

.success {
  color: #39FF14;
  text-shadow: 0 0 12px rgba(57, 255, 20, 0.6);
}

@media (max-width: 600px) {
  .Card {
    width: 90%;
    padding: 1rem;
  }

  input,
  button {
    font-size: 0.9rem;
  }
}
</style>