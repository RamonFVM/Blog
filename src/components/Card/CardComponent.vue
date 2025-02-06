<template>
  <div class="overlay" v-if="showForm">
    <div class="Card">
      <form @submit.prevent="AlterarUser">
        <label>Senha nova</label>
        <input type="password" v-model="NewPassword" />
        
        <label>Confirme a Senha</label>
        <input type="password" v-model="ConfirmPassword" />
        
        <button type="submit">Salvar</button>
        
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <div v-if="successMessage" class="success">{{ successMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {
      showForm: true,
      NewPassword: '',
      ConfirmPassword: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async AlterarUser() {
      
      this.errorMessage = '';
      this.successMessage = '';

 
      if (!this.NewPassword) {
        this.errorMessage = "Você precisa colocar uma nova senha.";
        return;
      }


      if (this.NewPassword !== this.ConfirmPassword) {
        this.errorMessage = 'As senhas não coincidem.';
        return;
      }


      const token = localStorage.getItem('authToken');
      if (!token) {
        this.errorMessage = 'Token de autenticação não encontrado.';
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
          this.errorMessage = 'Erro ao atualizar a senha.';
        }
      } catch (error) {
        this.errorMessage = 'Erro ao processar a solicitação. Tente novamente mais tarde.';
      }
    },
  },
};
</script>

<style scoped>

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
  border: 1px solid  0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 40px #39FF14, 0 0 80px #39FF14;;
  border-radius: 4px;
  background-color:  #2c2f36;
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
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.error{
  text-shadow: 0 0 5px red, 0 0 10px red, 0 0 15px red;
  color: red
}

.success{
  color: #39FF14;
  text-shadow: 0 0 12px rgba(57, 255, 20, 0.6);;

}
button:hover {
  background-color: chartreuse;
}

@media (max-width: 600px) {
  .Card {
    width: 90%;
    padding: 1rem;
  }

  input, button {
    font-size: 0.9rem;
  }
}
</style>