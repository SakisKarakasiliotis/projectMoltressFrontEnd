<template>
  <div class="estate">
    <div class="left">
      <img v-bind:src="estate.img">
    </div>
    <div class="right">
      <h1>{{ estate.title }}</h1>
      <span class="button" v-on:click="editEstate" v-if="canedit">Edit Estate</span>
      <h2> {{reviewsAvg}}★</h2>
      <div class="info">
        <div>
          <b>Cost: </b>
          <span>{{estate.price}} $ per day</span>
        </div>
        <div>
          <b>Type: </b>
          <span>{{estate.type}}</span>
        </div>
        <div>
          <b>Location: </b>
          <span>{{estate.country + " " + estate.city}}</span>
        </div>
        <div>
          <b>Beds: </b>
          <span>{{estate.beds}} </span>
        </div>
        <div>
          <b>Rooms: </b>
          <span>{{estate.rooms}} </span>
        </div>
        <div>
          <b>Bathrooms: </b>
          <span>{{estate.bathrooms}} </span>
        </div>
        <div>
          <b>Size: </b>
          <span>{{estate.size}} </span>
        </div>
      </div>
      <div class="info">
        <div>
          <b>AC: </b>
          <span>{{estate.airCondition ? "Yes" : "No"}}</span>
        </div>
        <div>
          <b>Wifi: </b>
          <span>{{estate.Wifi ? "Yes" : "No"}}</span>
        </div>
        <div>
          <b>Heating: </b>
          <span>{{estate.heating ? "Yes" : "No"}}</span>
        </div>
        <div>
          <b>Elevator: </b>
          <span>{{estate.elevator ? "Yes" : "No"}}</span>
        </div>
        <div>
          <b>Parking: </b>
          <span>{{estate.parking ? "Yes" : "No"}}</span>
        </div>
      </div>

    </div>
    <div class="book">

      <span class="button" v-on:click="bookNow">Book now</span>
    </div>
    <div class="reviews">
      <h2>Our reviews</h2>
      <div class="review" v-for="review in reviews">
        <h3>{{review.username}}</h3>
        <span>{{review.rating}} ★</span>
        <p>{{review.description}}</p>
      </div>
      <div class="form" v-if="loggedInUserId">
        <h3>Leave your review</h3>
        <div class="input-group">
          <label for="rating">Rating:</label>
          <input type="number" name="rating" id="rating" v-model="rating" step="0.5" max="5" min="1">
        </div>
        <div class="input-group">
          <label for="desc">A few Words:</label>
          <textarea name="desc" id="desc" v-model="desc" rows="5"></textarea>
        </div>
        <span class="button" v-on:click="addReview">Submit</span>

      </div>
    </div>


  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'estate',
    computed: {
      id: function () {
        if (this.$route.params.id != "") {
          return this.$route.params.id
        }
      }
    },
    data() {
      return {
        estate: [],
        reviews: [],
        reviewsAvg: 0,
        rating: 5,
        desc: "",
        loggedInUserId: 0,
        canedit: false
      }
    },
    methods: {
      editEstate: function () {
        let vm = this
        vm.$router.push({name: "editEstate", params: {estate: vm.id}})

      },
      bookNow: function () {
        let vm = this
        vm.$router.push({name: "Book", params: {estate: vm.id}})

      },
      addReview: function () {
        let vm = this
        let newReview = {
          bookingId: 1,
          description: vm.desc,
          estateId: vm.id,
          rating: vm.rating,
        }
        axios.post(`${vm.$datasrcURLbase}review`, newReview)
          .then(function (response) {
            newReview.username = vm.loggedInUserId
            vm.reviews.push(newReview)
          })
          .catch(function (e) {
            console.log(e)

          })
      },
    },
    created() {
      let vm = this
      if (vm.$cookies.isKey("userGroup")) {
        vm.loggedInUserId = vm.$cookies.get("user_id")
      }
      axios.get(`${vm.$datasrcURLbase}estate/${vm.id}`)
        .then(function (response) {
          vm.estate = response.data
          vm.canedit = vm.estate.ownerId == vm.$cookies.get("user_id") ? true : false
          axios.get(`${vm.$datasrcURLbase}asset/${vm.id}/estate`)
            .then(function (responseimg) {
              vm.estate.img = "../assets/" + responseimg.data[0].name
            })
            .catch(function (e) {
              console.log(e)
            })
          axios.get(`${vm.$datasrcURLbase}reviews/${vm.id}`)
            .then(function (response) {
              vm.reviews = response.data
              if (response.data.length) {
                let sum = vm.reviews.reduce((a, b) => {
                  return a.rating + b.rating
                })
                vm.reviewsAvg = sum / vm.reviews.length
                vm.reviews.forEach(r => {
                  axios.get(`${vm.$datasrcURLbase}user/${vm.id}`)
                    .then(function (responseUser) {
                      r.username = responseUser.data.fullName
                      vm.$forceUpdate();
                    })
                })
              } else {
                vm.reviewsAvg = vm.reviews.rating
              }
            })
            .catch(function (e) {
              console.log(e)
            })
        })
        .catch(function (e) {
          console.log(e)
        })


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {

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

  .book {
    flex-basis: 100%;
  }

  .book .button {
    margin: 0 auto;
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
