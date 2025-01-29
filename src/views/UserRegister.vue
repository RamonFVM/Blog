<template>
  <div class="register">
    <form>
      <div class="input-group">
        <label for="name">Nome</label>
        <input id="name" required type="text" />
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input id="email" required type="email" />
      </div>
      <div class="input-group">
        <label for="password">Senha</label>
        <input id="password" required type="password" />
      </div>
      <div class="input-group">
        <label for="confirm-password">Confirma Senha</label>
        <input id="confirm-password" required type="password" />
      </div>
      <button type="submit">Cadastrar-se</button>
    </form>
  </div>
</template>

<style scoped>
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