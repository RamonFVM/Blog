<template>
    <div class="container">
      <header class="Header">
        <button class="logout-btn">Sair</button>
        <span class="welcome-msg">Seja Bem Vindo, Usuario</span>
        <button class="edit-profile-btn">Editar Perfil</button>
      </header>
  
      <div class="forum">
        <input type="text" id="comment" placeholder="Escreva seu comentário..." />
        <button class="comment-btn">Publicar</button>
      </div>
    </div>
  </template>
  
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
  
  /* Botões */
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
    border: 1px solid #ccc;
    margin-top: 1rem;
    height: 6rem;
    resize: none; 
    background-color: #f9f9f9;
    color: #333;
  }
  
  /* Botão de comentar */
  .comment-btn {
    padding: 1rem 2rem;
    background-color: #28a745;
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
    background-color: #218838;
  }
  
  </style>
  