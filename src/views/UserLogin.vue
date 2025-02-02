<template>
  <MyHeader />
  <div class="div-login">
    <form @submit.prevent="logar">
      <h2 class="typewriter">Login</h2>
      <label class="typewriter">Usuário</label>
      <input v-model="login" placeholder="Coloque seu login" required type="text" />
      <label class="typewriter">Senha</label>
      <input v-model="senha" placeholder="Coloque sua senha" required type="password" />
      <button class="btn">Entrar</button>
    </form>


    <div v-if="errorLogin" class="error-message">
      {{ errorLogin }}
    </div>

    <span> <router-link to="/registrar">Cadastrar-se</router-link></span>
  </div>
</template>

<script>
import MyHeader from '@/components/Header/MyHeader.vue';
import axios from 'axios';

export default {
  components: {
    MyHeader,
  },
  data() {
    return {
      senha: '',     
      login: '',     
      errorLogin: '' 
    };
  },
  methods: {
    async logar() {
      if (this.senha && this.login) {
        try {
         
          const response = await axios.post('http://localhost:3000/auth', {
            name: this.login,  
            password: this.senha 
          });

          if (response.data && response.status===201) {
            const token = response.data.user.access_token; 
            
            if(token){
             
              localStorage.setItem('authToken', token);
              this.$router.push('/Home'); 

            }
           
          }
        } catch (error) {
        
            this.errorLogin = error.response.data.message || 'Erro ao tentar logar!';
          
        }
      } else {
        this.errorLogin = 'Por favor, preencha ambos os campos de usuário e senha!';
      }
    }
  }
};
</script>

 <style scoped>

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-shadow: 0 0 5px red, 0 0 10px red, 0 0 15px red;
}

  
 .div-login {
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
   display: flex;
   flex-direction: column;
 }
 
 .typewriter {
   font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
   font-size: 1.8rem;
   color: #39FF14;
   white-space: nowrap;
   overflow: hidden;

 }
 
 input {
   padding: 12px;
   margin-top: 16px;
   border: 2px solid #ccc;
   border-radius: 12px;
   width: 28rem;
   height: 1.8rem;
   font-size: 1.2rem;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   transition: box-shadow 0.3s ease, transform 0.3s ease;
   background-color: #444;  
 }
 
 input:focus {
   border-color: #39FF14;
   outline: none;
   box-shadow: 0 0 12px rgba(57, 255, 20, 0.6);
   transform: scale(1.02);
 }


 
 h2 {
   text-align: center;
   margin-bottom: 26px;
   font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
   color: #39FF14;
   font-size: 2rem;
   white-space: nowrap;
   overflow: hidden;
   animation: typing 3s steps(5) 1s forwards;
 }
 
 .btn {
   padding: 12px 24px;
   margin-top: 4rem;
   font-size: 1.2rem;
   font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
   background-color: transparent;
   color: #39FF14;
   border: 2px solid #39FF14;
   border-radius: 10px;
   cursor: pointer;
   width: 10rem;
   text-align: center;
   transition: background-color 0.3s ease, color 0.3s ease;
   margin-left: auto;
   margin-right: auto;
 }
 
 .btn:hover {
   background-color: #39FF14;
   color: black;
   box-shadow: 0 0 15px #39FF14, 0 0 30px #39FF14;
 }
 
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
 
 span a:active {
   transform: translateY(1px);
 }
 

 @media (max-width: 768px) {
   .div-login {
     width: 90%;
     padding: 1.5rem;
     min-height: auto;
   }
 
   .typewriter {
     font-size: 1.5rem;
   }
 
   input {
     width: 100%;
     font-size: 1rem;
   }
 
   .btn {
     width: 80%;
   }
 
   span {
     font-size: 1rem;
     margin-top: 2rem;
   }
 }
 </style>