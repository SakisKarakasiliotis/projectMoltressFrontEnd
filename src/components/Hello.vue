<template>
  <div class="hello">
    <h1>Welcome to ErathCorD</h1>
    <h2>Please select your destination and stay duration</h2>
    <div class="form">
      <h3 class="error" v-if="error_message">{{ error_message }}</h3>

      <div class="input-group">
        <label for="location">Destination</label>
        <input type="text" name="location" id="location" v-model="location">
      </div>
      <div class="input-group">
        <label for="startDate">Arrival</label>
        <datepicker id="startDate" class="date"  v-model="startDate"></datepicker>
      </div>
      <div class="input-group">
        <label for="endDate">Departure</label>
        <datepicker id="endDate" class="date" :min="startDate" v-model="endDate"></datepicker>
      </div>
      <div class="button-wrapper">
        <span class="button" v-on:click="search">Search</span>
      </div>
    </div>
  </div>
</template>

<script>
  import datepicker from 'vue-date'

  export default {
    name: 'hello',
    data() {
      Date.prototype.yyyymmdd = function () {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();

        return [this.getFullYear() + '-',
          (mm > 9 ? '' : '0') + mm + '-',
          (dd > 9 ? '' : '0') + dd
        ].join('');
      };

      let today = new Date();
      let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
      return {
        location: "Greece",
        startDate: today.yyyymmdd(),
        endDate: tomorrow.yyyymmdd(),
        error_message: ""


      }
    },
    methods: {
      search: function () {
        let vm = this
        if (vm.location == "any" || vm.location == "") {
          vm.error_message = "You must choose a location!"
          return
        }
        vm.error_message = ""
        vm.$router.push({name: "Estates", params: {location: vm.location, start: vm.startDate, end: vm.endDate}})
      },

    },
    components: {datepicker}

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 10px;
  }

  h1, h2 {
    font-weight: bold;
    text-align: center;
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

  .form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin-top: 35px;
    width: auto;
  }

  .input-group {
    flex-basis: 33.33%;
    flex-grow: 1;
  }

  input {
    width: 90%;
    margin: 0 10px 0 10px;
  }

  .date {
    width: 90%;
    margin: 0 10px 0 10px;
  }

  label {
    width: 90%;
    margin: 0 10px 0 10px;
    margin-bottom: 10px;
  }

  .button-wrapper {
    flex-basis: 100%;
  }

  .button {
    margin: 0 auto;
  }
</style>
