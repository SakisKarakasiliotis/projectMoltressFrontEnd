<template>
  <div id="app">
    <img class="logo" src="./assets/earthcord-logo.png" alt="">
    <div class="menu">
      <div class="menu-item"><a href="#home">Home</a></div>
      <div class="menu-item"><a href="#estates/all">Estates</a></div>
      <div class="menu-item" v-if="showProfile"><a href="#profile/me" v-if="showProfile">Profile</a></div>
      <div class="menu-item" v-if="showProfile"><a href="#login" v-on:click="logout" v-if="showProfile">Logout</a></div>
      <div class="menu-item" v-if="!showProfile"><a href="#login" v-if="!showProfile">Login</a></div>
      <div class="menu-item" v-if="!showProfile"><a href="#register">Register</a></div>
    </div>
    <div class="main--container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        headMessage: 'Login to EarthCorD',
        subtitle: "",
        email: "",
        password: "",
        showProfile: ""
      }
    },
    methods: {
      logout: function () {
        let vm = this
        if (vm.$cookies.isKey("userGroup")) {
          vm.$cookies.remove("userGroup")
          vm.$cookies.remove("user_id")
          vm.showProfile = false
          vm.$router.push({name: "Login"})

        }
      }
    },
    created() {
      let vm = this
      if (vm.$cookies.isKey("userGroup")) {
        vm.showProfile = true
      }
    },

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
    font-size: 1em;
  }

  .logo {
    margin: 0 auto;
    display: block;
    width: 150px;
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
    margin-top: 35px;
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
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 6px 10px 6px 4px;
    height: 32px;
    box-sizing: border-box;
  }

  input[type="checkbox"] {
    width: 10px;
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

  .error {
    flex-basis: 100%;
    width: 100%;
    padding: 20px 5px;
    text-align: center;
    background-color: #ef413d;
    color: #fff;
  }

  .paging {
    flex-basis: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin-top: 35px;
  }

  .paging > span {
    display: block;
    width: 100px;
    padding: 8px 16px;
    background-color: #2c3e50;
    color: #fff;
    font-weight: bold;
    text-align: center;
    min-width: auto;
  }

  .paging > span:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  .paging > span.disabled{
    cursor: not-allowed;
    opacity: 0.7;
    background-color: #808080;

  }

</style>
