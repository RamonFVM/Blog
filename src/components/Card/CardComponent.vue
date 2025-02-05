<template>
    <div class="Card">
        <form>
            <label >Nome</label>
            <input type="text">
            <label >Senha nova</label>
            <input type="password">
            <label>Confirme a Senha</label>
            <input type="password">
            <button>Salvar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default{
  data(){
    return{
      NewName:'',
      NewPassword:''
    }
 
  },
  methods:{
    async AlterarUser(){
      if(this.NewName || this.NewPassoword){

        try{
          const payload={}

        if(this.NewName){
          payload.name=this.NewName
        }
        if(this.NewPassword){
          payload.password=this.NewPassword
        }
       

          const response= await axios.put('http://localhost:3000/user', payload)

        }catch(error){

        }
      }
    }
  }
}


</script>

<style scoped>
.Card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  background-color: #fff;
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
}

input {
  margin-bottom: 1rem;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  background-color: #45a049;
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