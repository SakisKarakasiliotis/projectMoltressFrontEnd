<template>
  <div class="estates">
    <h1>{{ headMessage }}</h1>
    <h2>{{ subtitle }}</h2>
    <div class="form search">

      <div class="input-group">
        <label for="estate">Destination</label>
        <input type="text" name="estate" id="estate" v-model="estate">
      </div>
      <div class="input-group">
        <label for="startDate">Arrival</label>
        <datepicker id="startDate" class="date" v-model="start"></datepicker>
      </div>
      <div class="input-group">
        <label for="endDate">Departure</label>
        <datepicker id="endDate" class="date" :min="start" v-model="end"></datepicker>
      </div>
      <div class="button-wrapper">
        <span class="button" v-on:click="search">Search</span>
      </div>
    </div>
    <div class="estates-container">
      <div class="left">
        <div class="recomm" v-if="recomm">
          <h2>Reccomended for you</h2>

          <div class="estate">

            <div class="estate-left"><img v-bind:src="recomm.img" alt="" width="100px"></div>
            <div class="estate-right">
              <h3>{{recomm.title}}</h3>
              <div>
                <b>Cost: </b>
                <span>{{recomm.price}} $ per day</span>
              </div>
              <div>
                <b>Type: </b>
                <span>{{recomm.type}}</span>
              </div>
              <div>
                <b>Beds: </b>
                <span>{{recomm.beds}} beds</span>
              </div>
              <div>
                <b>Ratings: </b>
                <span>{{recomm.ratingCount}} averaging {{recomm.stars}}★</span>
              </div>
            </div>
          </div>
        </div>
        <h3>Filter estates</h3>

        <div class="input-group">
          <label for="type">Type</label>
          <select name="type" id="type" v-model="type">
            <option value="0">Please select</option>
            <option v-for="t in typeData">{{t}}</option>
          </select>
        </div>
        <div class="input-group">
          <label for="price">Max price</label>
          <input type="number" name="price" v-model="price" id="price" step="0.1">
        </div>
        <div class="input-group">
          <input type="checkbox" name="wifi" id="wifi" v-model="wifi" value="0">
          <label for="wifi">WiFi</label>
        </div>
        <div class="input-group">
          <input type="checkbox" name="heating" id="heating" v-model="heating">
          <label for="heating">Heating</label>
        </div>
        <div class="input-group">
          <input type="checkbox" name="ac" id="ac" v-model="ac">
          <label for="ac">Air Condition</label>
        </div>
        <div class="input-group">
          <input type="checkbox" name="kitchen" id="kitchen" v-model="kitchen">
          <label for="kitchen">Kitchen</label>
        </div>
        <div class="input-group">
          <input type="checkbox" name="parking" id="parking" v-model="parking">
          <label for="parking">Parking</label>
        </div>
        <div class="input-group">
          <input type="checkbox" name="elevator" id="elevator" v-model="elevator">
          <label for="elevator">Elevator</label>
        </div>

      </div>
      <div class="right">
        <h2 class="error" v-if="empty_message!=''">{{empty_message}}</h2>

        <div v-on:click="goToEstate(estate.id)" class="estate" v-if="empty_message==''" v-for="estate in estatesData"
             :estate="estate" :key="estate.id">
          <div class="estate-left"><img v-bind:src="estate.img" alt="" width="100px"></div>
          <div class="estate-right">
            <h3>{{estate.title}}</h3>
            <div>
              <b>Cost: </b>
              <span>{{estate.price}} $ per day</span>
            </div>
            <div>
              <b>Type: </b>
              <span>{{estate.type}}</span>
            </div>
            <div>
              <b>Beds: </b>
              <span>{{estate.beds}} beds</span>
            </div>
            <div>
              <b>Ratings: </b>
              <span>{{estate.ratingCount}} averaging {{estate.stars}}★</span>
            </div>
          </div>
        </div>

      </div>
      <div class="paging" v-if="maxPage > 1">
        <span class="previous" v-bind:class="{disabled: isPrvDisabled}" v-on:click="changePage(1)">◀ Previous</span>
        <span class="next" v-on:click="changePage(0)" v-bind:class="{disabled: isNxtDisabled}">Next ▶</span>
      </div>
    </div>

  </div>

</template>

<script>
  import axios from 'axios';
  import datepicker from 'vue-date'

  export default {

    name: 'Estates',
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
        headMessage: 'All the places you can stay!',
        subtitle: 'Have a look to our amazing list.',
        estatesData: [],
        file: "",
        page: 1,
        maxPage: 1,
        isPrvDisabled: true,
        isNxtDisabled: false,
        typeData: null,
        price: 0.0,
        wifi: 0,
        heating: 0,
        ac: 0,
        kitchen: 0,
        parking: 0,
        elevator: 0,
        type: "any",
        empty_message: "",
        estate: "",
        start: "",
        end: "",
        recomm: false,


      }
    },
    computed: {},
    methods: {
      search: function () {
        let vm = this
        vm.populateEstates()
        vm.page = 1
      },
      isArray: function (a) {
        return (!!a) && (a.constructor === Array);
      },
      goToEstate: function (id) {
        let vm = this
        vm.$router.push({name: "Estate", params: {id: id}})
      },
      changePage: function (previous) {
        let vm = this
        if (previous && vm.page > 1) {
          vm.page--

        } else if (!previous && vm.page < vm.maxPage) {
          vm.page++
        }
      },
      populateEstates: function () {
        let vm = this
        vm.empty_message = ""

        axios.get(`${vm.$datasrcURLbase}estate/count`)
          .then(r => {
            vm.maxPage = r.data
          })
          .catch(e => {
            console.log(e)
          })
        axios.get(`${vm.$datasrcURLbase}estate/types`)
          .then(r => {
            vm.typeData = r.data
          })
          .catch(e => {
            console.log(e)
          })
        if (vm.estate == "all") {
          axios.get(`${vm.$datasrcURLbase}estates/${vm.page}`)
            .then(function (response) {
              vm.estatesData = response.data
            })
            .catch(function (e) {
              console.log(e)
            })
        } else {
          if (vm.estate != "any") {
            let url = `${vm.$datasrcURLbase}estate/search/${vm.page}/${vm.estate}/${vm.start}/${vm.end}/${vm.type}/${vm.price}`
            url += vm.wifi ? `/1` : `/0`
            url += vm.heating ? `/1` : `/0`
            url += vm.ac ? `/1` : `/0`
            url += vm.kitchen ? `/1` : `/0`
            url += vm.parking ? `/1` : `/0`
            url += vm.elevator ? `/1` : `/0`
            axios.get(url)
              .then(function (response) {
                // JSON responses are automatically parsed.
                if (!response.data.length) {
                  vm.empty_message = "No estates found!"
                } else {
                  vm.estatesData = []
                  if (vm.isArray(response.data[0])) {
                    response.data.forEach(elem => {
                      elem[0].price = elem[1].price
                      axios.get(`${vm.$datasrcURLbase}asset/${elem[0].id}/estate`)
                        .then(function (response) {
                          elem[0].img = "../assets/" + response.data[0].name
                        })
                        .catch(function (e) {
                          console.log(e)

                        })
                      vm.estatesData.push(elem[0])
                    })
                    if (vm.estatesData.length < 10) vm.maxPage = 1
                  } else {
                    vm.estatesData = response.data
                  }


                }

              })
              .catch(function (e) {
                console.log(e)
              })
          } else {
            axios.get(`${vm.$datasrcURLbase}estates/${vm.page}`)
              .then(function (response) {
                vm.estatesData = response.data
              })
              .catch(function (e) {
                console.log(e)
              })
          }
        }

      }
    },
    watch: {
      page: function (val) {
        let vm = this
        vm.populateEstates()
        vm.isPrvDisabled = vm.page > 1 ? false : true
        vm.isNxtDisabled = vm.page < vm.maxPage ? false : true
      },
      price: function (val) {
        let vm = this

        vm.populateEstates()

      },
      wifi: function (val) {
        let vm = this
        vm.wifi;
        vm.populateEstates()

      },
      heating: function (val) {
        let vm = this

        vm.populateEstates()

      },
      ac: function (val) {
        let vm = this

        vm.populateEstates()

      },
      kitchen: function (val) {
        let vm = this

        vm.populateEstates()

      },
      parking: function (val) {
        let vm = this

        vm.populateEstates()

      },
      elevator: function (val) {
        let vm = this

        vm.populateEstates()

      },
      type: function (val) {
        let vm = this

        vm.populateEstates()

      },
    },

    created() {
      let vm = this

      vm.estate = vm.$route.params.location != "" ? vm.$route.params.location : "all"
      vm.start = vm.$route.params.start
      vm.end = vm.$route.params.end

      vm.populateEstates()
      if (vm.$cookies.isKey("userGroup")) {

        axios.get(`${vm.$datasrcURLbase}user/recommend/${vm.$cookies.get("user_id")}`)
          .then(function (response) {
            vm.recomm = response.data
          })
          .catch(function (e) {
            console.log(e)
          })
      }
    },
    components: {
      datepicker
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
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

  input[type="checkbox"] {
    width: 10px;
    height: auto;
    float: left;
  }

  .estate {
    flex-basis: 32%;
    margin-left: 1%;
    margin-bottom: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  .estate-left {
    flex-basis: 120px;

  }

  .estate-left img {
    padding: 10px;
  }

  .estate-right {
    padding: 10px;
    flex-basis: calc(100% - 140px);
  }

  .estates-container {
    flex-basis: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    margin-top: 35px;
  }

  label {
    width: 80%;
  }

  input[type="text"] {
    width: 100px;
    max-width: 100px;
  }

  input[type="number"] {
    width: 100px;
    max-width: 100px;
  }

  input[type="checkbox"] + label {
    width: auto;
  }

  .left {
    flex-basis: 20%;
  }

  .right {
    flex-basis: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
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

  #estate {
    width: 90%;
    margin: 0 10px 0 10px;
    max-width: 100%;
  }

  .search {

  }

</style>
