<template>
  <div class="login">
    <div class="form">
      <h1>{{ headMessage }}</h1>
      <h2>{{ subtitle }}</h2>
      <h3 class="error" v-if="error_message">{{ error_message }}</h3>

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
        password: "",
        error_message: ""

      }
    },
    methods: {
      login: function () {
        let vm = this
        if (!vm.$cookies.isKey("userGroup")) {
          axios.get(`${vm.$datasrcURLbase}user/${vm.email}/${vm.password}`)
            .then(function (response) {
              vm.$cookies.set("userGroup", String(response.data.userGroupId), "0");
              vm.$cookies.set("user_id", String(response.data.id), "0");
              vm.$router.push({name: "Profile", params: {user: "me"}})
            })
            .catch(function (e) {
              vm.error_message = "Something went wrong please try again!"
              vm.$cookies.remove("userGroup");

            })
        }


      },
    },
    created() {
      let vm = this
      if (vm.$cookies.isKey("userGroup")) {
        vm.$router.push({name: "Profile", params: {user: "me"}})
      }
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
