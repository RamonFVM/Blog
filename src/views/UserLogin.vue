<template>
  
     <div class="div-login">
        <form>
           <h2>Login</h2>
           <label >Usuario</label>
           <input type="text">
           <label>Senha</label>
           <input type="password">
        </form>
     </div>

</template>

<style scoped>


.div-login {  
  background-color: transparent;
  padding: 2rem;
  border-radius: 10px;
  width: 30rem;
  margin: 50px auto;
  height: 28rem;
  border: 3px solid #39FF14;
 

}

form {
  display: flex;
  flex-direction: column;
  
}

label {
  margin-top: 10px;
  font-weight: bold;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 1.8rem;
  color: #39FF14; 
  text-shadow: 0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 15px #39FF14; 
}

input {
  padding: 10px;
  margin-top: 16px;
  border: 1px solid #ccc;
  border-radius: 16px;
  width: 28rem;
  height: 1.3rem;
  font-size: larger;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

input:focus{
   border:none;
   outline: none;
}

h2 {
  text-align: center;
  margin-bottom: 26px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: #39FF14; 
  font-size: 2rem;
  text-shadow: 0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 15px #39FF14; 
}
</style>