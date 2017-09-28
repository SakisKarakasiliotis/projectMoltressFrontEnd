<template>
  <div id="app">
    <img src="./assets/logo.png" alt="">
    <div class="menu">
      <div class="menu-item"><a href="#home">Home</a></div>
      <div class="menu-item"><a href="#estates">Estates</a></div>
      <div class="menu-item"><a href="#estates">Estates</a></div>
      <div class="menu-item"><a href="#estates">Estates</a></div>
      <div class="menu-item"><a href="#estates">Estates</a></div>
      <div class="menu-item"><a href="#login">Login</a></div>
      <div class="menu-item"><a href="#estates">Register</a></div>
    </div>
    <div class="main--container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body {
    font-size: 16px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    font-size: 1em;
  }

  .main--container {
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    margin-top: 40px;
  }

  .menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .menu-item {
    flex-basis: auto;
    flex-grow: 1;
    text-align: center;

  }

  .menu-item a {
    font-size: 1.2em;
    text-decoration: none;
    color: #000;
  }

  .menu-item:hover {
    opacity: 0.8;
  }

  .form {
    width: 100%;
    margin-top: 30px;
    padding: 0 20px;
  }

  .input-group {
    width: 100%;
    margin-bottom: 20px;
    display: block;
  }

  label {
    font-size: 1.2em;
    width: 100%;
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    display: block;
    font-size: 1.2em;
    border-radius: 3px;
  }

  .button {
    display: block;
    width: 160px;
    padding: 8px 16px;
    background-color: #2c3e50;
    color: #fff;
    font-weight: bold;
    text-align: center;
    min-width: auto;
  }

  .button:hover {
    opacity: 0.8;
    cursor: pointer;
  }
</style>
