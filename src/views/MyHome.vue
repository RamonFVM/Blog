<template>
  <div class="container">
    <header class="Header">
      <button class="logout-btn">Sair</button>
      <span class="welcome-msg">Seja Bem Vindo, {{ username }}</span>
      <button class="edit-profile-btn">Editar Perfil</button>
    </header>

    <div class="forum">
      <span class="username-span">@{{ username }}</span>
      <input v-model="Posts" type="text" id="comment" placeholder="Escreva seu comentário..." />
      <button class="comment-btn" @click="CreatePost()">Publicar</button>

      <!-- Exibe uma mensagem caso o campo de comentário esteja vazio -->
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>

      <!-- Exibe a pré-visualização do post -->
      <div v-if="Posts" class="post-preview">
        <p>Pré-visualização: {{ Posts }}</p>
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
      errorMessage: '', 
    };
  },
  created() {
    this.loadUserInfo();
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
    async CreatePost() {
  const token = localStorage.getItem('authToken');  
  if (token) {
    try {
      const decodedToken = jwt_decode(token); 
      const userId = decodedToken.sub;  


      console.log("oi" + token)
      if (!this.Posts.trim()) {
        this.errorMessage = "Por favor, escreva algo no campo de comentário.";
        return;
      }

    
      this.errorMessage = '';

   
      const response = await axios.post('http://localhost:3000/post', {
        content: this.Posts, 
        userId: userId,  
      });

      
      console.log(response.data);

      
      this.Posts = '';
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
    }
  }
}

  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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

.logout-btn, .edit-profile-btn {
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.logout-btn:hover, .edit-profile-btn:hover {
  background-color: #0056b3;
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
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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

.post-preview {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #2c2f36;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
}
</style>