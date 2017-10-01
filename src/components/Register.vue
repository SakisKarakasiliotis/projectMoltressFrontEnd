<template>
  <div class="register">
    <div class="form">
      <h1>{{ headMessage }}</h1>
      <h2>{{ subtitle }}</h2>
      <h3 class="error" v-if="error_message">{{ error_message }}</h3>
      <div class="input-group">
        <label for="fullname">Full Name</label>
        <input autocomplete required type="text" name="fullname" id="fullname" v-model="fullname">
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input autocomplete required type="text" name="email" id="email" v-model="email">
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input required type="password" name="password" id="password" v-model="password">
      </div>
      <div class="input-group">
        <label for="repassword">Repeat Password</label>
        <input required type="password" name="repassword" id="repassword" v-model="repassword">
      </div>
      <div class="input-group">
        <label for="phone">Phone Number</label>
        <input autocomplete required type="text" name="phone" id="phone" v-model="phone">
      </div>
      <div class="input-group">
        <label for="host">Would you like to become a Host?</label>
        <input type="checkbox" name="host" id="host" v-model="host">
      </div>

      <!--<div class="input-group" >-->
      <!--<label for="host">Upload your profile picture</label>-->
      <!--<fileupload  v-on:progress="progress" v-on:start="startUpload" v-on:finish="finishUpload" v-bind:target="uploadURL" action="POST"></fileupload>-->
      <!--</div>-->
      <span class="button" v-on:click="register">Register</span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import FileUpload from 'vue-simple-upload/dist/FileUpload'


  export default {

    name: 'Register',
    data() {
      return {
        headMessage: 'Register to EarthCorD',
        subtitle: "Please fill out all the fields",
        fullname: "",
        email: "",
        password: "",
        repassword: "",
        phone: "",
        host: "",
        error_message: "",
        uploadURL: "http://localhost:8080/api/upload/estate/4"
      }
    },
    methods: {
      startUpload(e) {
        // file upload start event
        console.log(e);
      },
      finishUpload(e) {
        // file upload finish event
        console.log(e);
      },
      progress(e) {
        // file upload progress
        // returns false if progress is not computable
        console.log(e);
      },
      register: function () {
        let vm = this
        let to_be_promoted = vm.host ? 1 : 0
        console.log("click")
        if (vm.fullname == "") {
          vm.error_message = "Please fill your fullname"
          return
        }
        if (vm.email == "") {
          vm.error_message = "Please fill your email"
          return
        }
        if (vm.password == "") {
          vm.error_message = "Please fill your password"
          return
        }
        if (vm.repassword == "") {
          vm.error_message = "Please re-type your password"
          return
        }
        if (vm.phone == "") {
          vm.error_message = "Please fill your phone"
          return
        }
        if (vm.password != vm.repassword) {
          vm.error_message = "Passwords don't match"
          return
        }

        vm.error_message = ""
        if (!vm.$cookies.isKey("userGroup")) {
          console.log("in axios")
          axios.post(`${vm.$datasrcURLbase}user`, {
            email: vm.email,
            fullName: vm.fullname,
            phoneNo: vm.phone,
            password: vm.password,
            to_be_promoted: to_be_promoted,
          })
            .then(function (response) {
              vm.$cookies.set("userGroup", String(response.data.userGroupId), "0");
              vm.$cookies.set("user_id", String(response.data.id), "0");
              vm.$router.push({name: "Profile", params: {user: "me"}})
              console.log("SUCCESS")
            })
            .catch(function (e) {
              vm.$cookies.remove("userGroup");
              vm.$cookies.remove("user_id");
              vm.error_message = "Something went wrong please try again!"
              console.log(e)

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
    components: {
      'fileupload': FileUpload,
    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    padding: 10px;
  }
  .LocationPicker{
    height: 400px;
  }


</style>
