<template>
  <div class="hello">
    <h1>Welcome to ErathCorD</h1>
    <h2>Please select your destination and stay duration</h2>
    <div class="form">
      <div class="input-group">
        <label for="location">Location</label>
        <input type="text" name="location" id="location" v-model="location">
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
export default {
  name: 'hello',
  data () {
    return {
      location: "",
      password: ""
    }
  },
  methods: {
    login: function () {
      let vm = this
      vm.$router.push({name: "Estates", params: {location: vm.location}})
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
