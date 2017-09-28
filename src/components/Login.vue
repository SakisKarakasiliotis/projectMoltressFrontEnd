<template>
  <div class="login">
    <div class="form">
      <h1>{{ headMessage }}</h1>
      <h2>{{ subtitle }}</h2>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" v-model="email">
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password">
      </div>
      <span class="button" v-on:click="login">Log in</span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {

    name: 'Login',
    data() {
      return {
        headMessage: 'Login to EarthCorD',
        subtitle: "",
        email: "",
        password: ""
      }
    },
    methods: {
      login: function () {
        let vm = this
        axios.get(`${vm.$datasrcURLbase}user/${vm.email}/${vm.password}`)
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            this.errors.push(e)
          })

      },
    },
    created() {
    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    padding: 10px;
  }



</style>
