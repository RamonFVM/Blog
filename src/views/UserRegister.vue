<template>
  <div class="register">
    <form @submit.prevent="registrar">
      <div class="input-group">
        <label for="name">Nome</label>
        <input v-model="nome" id="name" required type="text" />
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input v-model="email" id="email" required type="email" />
      </div>
      <div class="input-group">
        <label for="password">Senha</label>
        <input v-model="senha" id="password" required type="password" />
      </div>
      <div class="input-group">
        <label for="confirm-password">Confirma Senha</label>
        <input v-model="confirmSenha" id="confirm-password" required type="password" />
      </div>

 
      <div v-if="erroCadastro" class="error-message">
        {{ erroCadastro }}
      </div>

      <button type="submit">Cadastrar-se</button>
    </form>
        <span> <router-link to="/">Entrar</router-link></span>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nome: '',
      email: '',
      senha: '',
      confirmSenha: '',
      erroCadastro: ''  
    };
  },
  methods: {
   

    async registrar() {
      if (this.senha !== this.confirmSenha) {
        this.erroCadastro = 'As senhas não coincidem!';
        return;
      }


      try {
        await axios.post('http://localhost:3000/user', {
          name: this.nome,
          email: this.email,
          password: this.senha,
        });

        alert('Usuário cadastrado com sucesso!');

        this.nome = '';
        this.email = '';
        this.senha = '';
        this.confirmSenha = '';
        this.erroCadastro = '';  
      } catch (error) {
        this.erroCadastro = error.response?.data?.message || 'Erro ao cadastrar usuário.'; 
      }
    },
  },
};
</script>


<style scoped>
span {
   margin: 1.8rem;
   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
   position: relative;
   display: inline-block;
 }
 
 span a {
   text-decoration: none;
   color: white;
   font-size: 1.2rem;
   font-weight: bold;
   padding: 5px 10px;
   border-radius: 5px;
   background: linear-gradient(45deg, #39FF14, aqua);
   box-shadow: 0 4px 6px rgba(0, 255, 0, 0.4);
   transition: all 0.3s ease;
 }
 
 span a:hover {
   color: #000;
   background: linear-gradient(45deg, aqua, #39FF14);
   box-shadow: 0 6px 10px rgba(0, 255, 0, 0.6);
   transform: translateY(-3px);
 }
.error-message{
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-shadow: 0 0 5px red, 0 0 10px red, 0 0 15px red;

}
.register {
  background-color: #202024;
  padding: 2rem;
  border-radius: 10px;
  width: 30rem;
  margin: 50px auto;
  height: auto;
  min-height: 29rem;
  border: 3px solid #39FF14;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  width: 100%;
}

.input-group {
  margin-bottom: 1.5rem;
  width: 100%;
}

input:focus {
  outline: none;    
  border: none;     
  background-color: #444;  
}


label {
  color: #fff;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
  font-family: monospace;
}

input {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #39FF14;
  background-color: #333;
  color: #fff;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #ff5c5c;
  background-color: #444;
}

input::placeholder {
  color: #ccc;
}

button {
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  background-color: #39FF14;
  color: #202024;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s ease-in-out;
}

button:hover {
  background-color: #33e30b;
  transform: scale(1.05);
  box-shadow: 0 0 10px 2px #39FF14, 0 0 15px 4px #33e30b; 
}

button:active {
  background-color: #2ad506;
  box-shadow: 0 0 20px 4px #2ad506, 0 0 25px 6px #33e30b; 
}
</style>