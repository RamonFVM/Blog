<template>
    <div class="Header">
      <h1 class="typewriter">Seu Forum Online</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyHeader'
  }
  </script>
  
  <style scoped>
  .Header {
    font-size: 2rem;
    color: #39FF14;
    background-color: #202024;
    padding: 2rem;
    margin-top: 0;
    margin-bottom: 3rem;
    width: 100%;
    text-align: center;
    transition: text-shadow 0.3s ease;
  }
  

  .Header:hover {
    text-shadow: 0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 40px #39FF14, 0 0 80px #39FF14;
  }
  
 
  .typewriter {
    display: inline-block;
    overflow: hidden; 
    white-space: nowrap;
    border-right: 0.15em solid #39FF14; 
    animation: typing 4s steps(30) 1s forwards, blink 0.75s step-end infinite;
  }
  

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  
  
  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
  

  @media (max-width: 768px) {
    .Header {
      font-size: 1.5rem;
      padding: 1.5rem;
    }
  
    .typewriter {
      font-size: 1.5rem; 
    }
  }
  </style>