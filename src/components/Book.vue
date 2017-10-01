<template>
  <div class="book">
    <h2>Book now!</h2>
    <div class="form" v-if="loggedInUserId">
      <h3 class="error" v-if="error_message">{{ error_message }}</h3>
      <h3 class="success" v-if="success_message">{{ success_message }}</h3>
      <div class="input-group">
        <label for="startDate">Arrival</label>
        <datepicker id="startDate" class="date" v-model="startDate"></datepicker>
      </div>
      <div class="input-group">
        <label for="endDate">Departure</label>
        <datepicker id="endDate" class="date" :min="startDate" v-model="endDate"></datepicker>
      </div>
      <div class="input-group">
        <label for="people">People:</label>
        <input type="number" name="people" id="people" v-model="people" step="1" min="0">
      </div>

      <span class="button" v-on:click="bookNow">Submit</span>

    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import datepicker from 'vue-date'

  export default {
    name: 'Book',
    computed: {
      id: function () {
        if (this.$route.params.id != "") {
          return this.$route.params.id
        }
      }
    },
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
        estate: [],
        reviews: [],
        reviewsAvg: 0,
        rating: 5,
        desc: "",
        loggedInUserId: 0,
        startDate: today.yyyymmdd(),
        endDate: tomorrow.yyyymmdd(),
        people: 2,
        error_message: "",
        success_message: ""
      }
    },
    methods: {
      bookNow: function () {
        let vm = this
        let booking = {
          estateId: vm.id,
          startDate: vm.startDate,
          endDate: vm.endDate,
          visitorId: vm.loggedInUserId,
          persons: vm.people
        }
        axios.post(`${vm.$datasrcURLbase}booking/book`, booking)
          .then(function (response) {
            vm.error_message = ""
            vm.success_message = "Suuccessfully Booked!"
          })
          .catch(function (e) {
            vm.success_message = ""
            vm.error_message = "Something Went wrong!!"

            console.log(e)
          })
      },
    },
    created() {
      let vm = this
      if (vm.$cookies.isKey("userGroup")) {
        vm.loggedInUserId = vm.$cookies.get("user_id")
      } else {
        vm.$router.push({name: "Login"})
      }


    },
    components: {datepicker}

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {

  }

  .book {

    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    padding: 10px;
  }

  .estate {
    flex-basis: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    max-width: 1024px;
    margin: 0 auto;
    justify-content: space-around;
  }

  .left {
    flex-basis: 50%;
  }

  .left img {
    width: 100%;
  }

  .right {
    flex-basis: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }

  .right h1 {
    text-align: center;
    width: 100%;

  }

  .right h2 {
    text-align: center;
    width: 100%;

  }

  .info > div {
    width: 100%;
    font-size: 1.3em;
    padding: 10px;
  }

  .reviews {
    flex-basis: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .review {
    padding: 10px;
    width: 100%;
    margin-bottom: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
</style>
