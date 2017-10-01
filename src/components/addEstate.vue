<template>
  <div class="register" v-if="estateEditId == 'new'">
    <div class="form">
      <h1>{{ headMessage }}</h1>
      <h2>{{ subtitle }}</h2>
      <h3 class="error" v-if="error_message">{{ error_message }}</h3>
      <div class="input-group">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" v-model="title">
      </div>
      <div class="input-group">
        <label for="size">Size</label>
        <input type="number" name="size" id="size" v-model="size">
      </div>
      <div class="input-group">
        <label for="type">Type</label>
        <input type="text" name="type" id="type" v-model="type">
      </div>
      <div class="input-group">
        <label for="country">Country</label>
        <input type="text" name="country" id="country" v-model="country">
      </div>
      <div class="input-group">
        <label for="city">City</label>
        <input type="text" name="city" id="city" v-model="city">
      </div>
      <div class="input-group">
        <label for="rooms">Rooms</label>
        <input type="number" name="rooms" id="rooms" v-model="rooms">
      </div>
      <div class="input-group">
        <label for="bathrooms">Bath Rooms</label>
        <input type="number" name="bathrooms" id="bathrooms" v-model="bathrooms">
      </div>
      <div class="input-group">
        <label for="beds">Beds</label>
        <input type="number" name="beds" id="beds" v-model="beds">
      </div>
      <div class="input-group">
        <label for="floor">Floor</label>
        <input type="number" name="floor" id="floor" v-model="floor">
      </div>
      <div class="input-group">
        <label for="storeys">Storeys</label>
        <input type="number" name="storeys" id="storeys" v-model="storeys">
      </div>
      <div class="input-group">
        <label for="wifi">WIFI</label>
        <input type="checkbox" name="wifi" id="wifi" v-model="wifi">
      </div>
      <div class="input-group">
        <label for="ac">AC</label>
        <input type="checkbox" name="ac" id="ac" v-model="ac">
      </div>
      <div class="input-group">
        <label for="heating">Heating</label>
        <input type="checkbox" name="heating" id="heating" v-model="heating">
      </div>
      <div class="input-group">
        <label for="kitchen">Kitchen</label>
        <input type="checkbox" name="kitchen" id="kitchen" v-model="kitchen">
      </div>
      <div class="input-group">
        <label for="elevator">Elevator</label>
        <input type="checkbox" name="elevator" id="elevator" v-model="elevator">
      </div>
      <div class="input-group">
        <label for="sitting_room">Sitting Room</label>
        <input type="checkbox" name="sitting_room" id="sitting_room" v-model="sitting_room">
      </div>
      <div class="input-group">
        <label for="startDate">Arrival</label>
        <datepicker id="startDate" class="date" v-model="start"></datepicker>
      </div>
      <div class="input-group">
        <label for="endDate">Departure</label>
        <datepicker id="endDate" class="date" :min="start" v-model="end"></datepicker>
      </div>
      <div class="input-group">
        <label for="price">Price</label>
        <input type="number" name="price" id="price" v-model="price">
      </div>

      <span class="button" v-on:click="addEstate">Add estate</span>
    </div>
  </div>
  <div class="register" v-else-if="estateEditId != 'new'">
    <div class="form">
      <h1>{{ headMessage }}</h1>
      <h2>{{ subtitle }}</h2>
      <h3 class="error" v-if="error_message">{{ error_message }}</h3>
      <div class="input-group">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" v-model="title">
      </div>
      <div class="input-group">
        <label for="size">Size</label>
        <input type="number" name="size" id="size" v-model="size">
      </div>
      <div class="input-group">
        <label for="type">Type</label>
        <input type="text" name="type" id="type" v-model="type">
      </div>
      <div class="input-group">
        <label for="country">Country</label>
        <input type="text" name="country" id="country" v-model="country">
      </div>
      <div class="input-group">
        <label for="city">City</label>
        <input type="text" name="city" id="city" v-model="city">
      </div>
      <div class="input-group">
        <label for="rooms">Rooms</label>
        <input type="number" name="rooms" id="rooms" v-model="rooms">
      </div>
      <div class="input-group">
        <label for="bathrooms">Bath Rooms</label>
        <input type="number" name="bathrooms" id="bathrooms" v-model="bathrooms">
      </div>
      <div class="input-group">
        <label for="beds">Beds</label>
        <input type="number" name="beds" id="beds" v-model="beds">
      </div>
      <div class="input-group">
        <label for="floor">Floor</label>
        <input type="number" name="floor" id="floor" v-model="floor">
      </div>
      <div class="input-group">
        <label for="storeys">Storeys</label>
        <input type="number" name="storeys" id="storeys" v-model="storeys">
      </div>
      <div class="input-group">
        <label for="wifi">WIFI</label>
        <input type="checkbox" name="wifi" id="wifi" v-model="wifi">
      </div>
      <div class="input-group">
        <label for="ac">AC</label>
        <input type="checkbox" name="ac" id="ac" v-model="ac">
      </div>
      <div class="input-group">
        <label for="heating">Heating</label>
        <input type="checkbox" name="heating" id="heating" v-model="heating">
      </div>
      <div class="input-group">
        <label for="kitchen">Kitchen</label>
        <input type="checkbox" name="kitchen" id="kitchen" v-model="kitchen">
      </div>
      <div class="input-group">
        <label for="elevator">Elevator</label>
        <input type="checkbox" name="elevator" id="elevator" v-model="elevator">
      </div>
      <div class="input-group">
        <label for="sitting_room">Sitting Room</label>
        <input type="checkbox" name="sitting_room" id="sitting_room" v-model="sitting_room">
      </div>
      <div class="input-group">
        <label for="uploadURL">Upload Image</label>
        <fileupload id="uploadURL" v-on:progress="progress" v-on:start="startUpload" v-on:finish="finishUpload"
                    v-bind:target="uploadURL" action="POST"></fileupload>
      </div>


      <span class="button" v-on:click="editEstate">Edit estate</span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import FileUpload from 'vue-simple-upload/dist/FileUpload'
  import datepicker from 'vue-date'


  export default {

    name: 'Register',
    data() {

      Date.prototype.yyyymmdd = function () {
        let mm = this.getMonth() + 1; // getMonth() is zero-based
        let dd = this.getDate();

        return [this.getFullYear() + '-',
          (mm > 9 ? '' : '0') + mm + '-',
          (dd > 9 ? '' : '0') + dd
        ].join('');
      };

      let today = new Date();
      let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
      return {
        headMessage: 'Add new estate',
        subtitle: "Please fill out all the fields",
        host: "",
        error_message: "",
        title: "",
        size: "",
        type: "",
        country: "",
        city: "",
        rooms: "",
        bathrooms: "",
        beds: "",
        floor: "",
        storeys: "",
        wifi: false,
        ac: false,
        heating: false,
        kitchen: false,
        elevator: false,
        sitting_room: false,
        start: today.yyyymmdd(),
        end: tomorrow.yyyymmdd(),
        price: ""
      }
    },
    computed: {
      uploadURL: function () {
        let vm = this
        return "http://localhost:8080/api/upload/estate/" + vm.estateEditId
      }
    },

    methods: {
      editEstate: function () {
        let vm = this
        axios.put(`${vm.$datasrcURLbase}estate`, {
          id: vm.estateEditId,
          title: vm.title,
          size: vm.size,
          type: vm.type,
          country: vm.country,
          city: vm.city,
          rooms: vm.rooms,
          bathrooms: vm.bathrooms,
          beds: vm.beds,
          floor: vm.floor,
          storeys: vm.storeys,
          wifi: vm.wifi ? 1 : 0,
          ac: vm.ac ? 1 : 0,
          heating: vm.heating ? 1 : 0,
          kitchen: vm.kitchen ? 1 : 0,
          elevator: vm.elevator ? 1 : 0,
          sitting_room: vm.sitting_room ? 1 : 0,
        })
          .then(function (response) {
          })
          .catch(function (e) {
            console.log(e)
          })
      },
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
      addEstate: function () {
        let vm = this

        if (vm.title == "") {
          vm.error_message = "Please fill title"
          return
        }
        if (vm.type == "") {
          vm.error_message = "Please fill type"
          return
        }
        if (vm.country == "") {
          vm.error_message = "Please fill country"
          return
        }

        vm.error_message = ""
        axios.post(`${vm.$datasrcURLbase}estate`, {
          title: vm.title,
          size: vm.size,
          type: vm.type,
          country: vm.country,
          city: vm.city,
          rooms: vm.rooms,
          bathrooms: vm.bathrooms,
          beds: vm.beds,
          floor: vm.floor,
          storeys: vm.storeys,
          wifi: vm.wifi ? 1 : 0,
          airCondition: vm.ac ? 1 : 0,
          heating: vm.heating ? 1 : 0,
          kitchen: vm.kitchen ? 1 : 0,
          elevator: vm.elevator ? 1 : 0,
          sittingRoom: vm.sitting_room ? 1 : 0
        })
          .then(function (response) {
            let estateid = response.data.substr(response.data.lastIndexOf('/') + 1)
            axios.post(`${vm.$datasrcURLbase}availability`, {
              start_date: vm.start,
              end_date: vm.end,
              price: vm.price,
              estateId: estateid
            })
              .then(function (response) {
                vm.$router.push({name: "Estate", params: {id: estateid}})

              })
              .catch(function (e) {

                console.log(e)

              })
          })
          .catch(function (e) {

            console.log(e)

          })


      },
    },
    created() {
      let vm = this
      vm.estateEditId = vm.$route.params.id != "" ? vm.$route.params.id : "new"
      if (vm.estateEditId != "new") {
        vm.headMessage = "Edit estate"
        axios.get(`${vm.$datasrcURLbase}estate/${vm.estateEditId}`)
          .then(function (response) {
            vm.title = response.data.title
            vm.size = response.data.size
            vm.type = response.data.type
            vm.country = response.data.country
            vm.city = response.data.city
            vm.rooms = response.data.rooms
            vm.bathrooms = response.data.bathrooms
            vm.beds = response.data.beds
            vm.floor = response.data.floor
            vm.storeys = response.data.storeys
            vm.wifi = response.data.wifi
            vm.ac = response.data.airCondition
            vm.heating = response.data.heating
            vm.kitchen = response.data.kitchen
            vm.elevator = response.data.elevator
            vm.sitting_room = response.data.sitting_room
          })
          .catch(function (e) {
            console.log(e)
          })
      }
    },
    components: {
      'fileupload': FileUpload,
      datepicker

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


</style>
