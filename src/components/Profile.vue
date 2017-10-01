<template>
  <div class="profile" v-if="!isadmin">
    <div class="form" v-if="edit">
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
      <span class="button" v-on:click="editInfo">Edit</span>
    </div>
    <div class="form" v-else>
      <h1>{{ headMessage }}</h1>
      <h2>{{ subtitle }}</h2>
      <div class="input-group">
        <label for="fullname">Full Name: </label>
        <span>{{fullname}}</span>
      </div>
      <div class="input-group">
        <label for="email">Email: </label>
        <span>{{email}}</span>
      </div>
      <div class="input-group">
        <label for="phone">Phone Number: </label>
        <span>{{phone}}</span>
      </div>
      <div class="input-group">
        <label for="host">User Group: </label>
        <span>{{userGroup}}</span>
      </div>
      <span class="button" v-if="user == 'me'" v-on:click="triggerEdit">Edit profile</span>

    </div>
    <div class="estates" v-if="userGroupId<3 && !edit">
      <h2 class="title">Your estates!</h2>

      <div v-on:click="goToEstate(estate.id)" class="estate" v-for="estate in estatesData" :estate="estate"
           :key="estate.ownerId">
        <div class="estate-left"><img src="../assets/logo.png" alt="" width="100px"></div>
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

    <div class="profile_table" v-if="isadmin">
      <table>
        <tr>
          <th>ID</th>
          <th>Fullname</th>
          <th>email</th>
          <th>phone</th>
          <th>userGroup</th>
          <th>Make Host</th>
        </tr>
        <tr v-for="rowuser in otherUsers">
          <td>{{rowuser.id}}</td>
          <td>{{rowuser.fullName}}</td>
          <td>{{rowuser.email}}</td>
          <td>{{rowuser.phoneNo}}</td>
          <td>{{rowuser.userGroupId}}</td>
          <td><span v-if="!(rowuser.userGroupId<3) && rowuser.to_be_promoted" class="button"
                    v-on:click="makeHost(rowuser.id)">Make host</span>
          </td>
        </tr>
      </table>
    </div>
    <div class="estates" v-if="!edit">
      <h2 class="title">Your Bookings!</h2>

      <div class="booking" v-for="booking in bookingsData" :booking="booking">
        <h3>{{booking.estateTitle}}</h3>
        <span>Start Date {{booking.startDate}}</span>
        <span>End Date {{booking.endDate}}</span>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import estate from '@/components/Estate'

  export default {

    name: 'Profile',
    data() {
      return {
        headMessage: "",
        subtitle: "",
        edit: false,
        fullname: "",
        email: "",
        password: "",
        repassword: "",
        phone: "",
        host: "",
        error_message: "",
        estatesData: [],
        bookingsData: [],
        isadmin: false,
        otherUsers: [],
        userGroupId: "",
        userGroup: ""
      }
    },
    computed: {
      user: function () {
        let vm = this
        return vm.$route.params.user
      },

    },
    methods: {
      goToEstate: function (id) {
        let vm = this
        vm.$router.push({name: "Estate", params: {id: id}})
      },
      editInfo: function () {
        let vm = this
        let to_be_promoted = vm.host ? 1 : 0
        let currentUser = {
          id: vm.$cookies.get("user_id"),
          email: vm.email,
          fullName: vm.fullname,
          phoneNo: vm.phone,
          to_be_promoted: to_be_promoted,
        }
        if (vm.password == vm.repassword && vm.password != "") {
          currentUser.password = vm.password
        }
        axios.put(`${vm.$datasrcURLbase}user`, currentUser)
          .then(function (response) {
            vm.$cookies.set("userGroup", String(response.data.userGroupId), "0")
            vm.edit = !vm.edit
          })
          .catch(function (e) {
            vm.$cookies.remove("userGroup")
          })


      },
      makeHost: function (user_id) {
        let vm = this
        axios.put(`${vm.$datasrcURLbase}user`, {
          id: user_id,
          userGroupId: 2
        })
          .then(function (response) {
            for (let i = 0; i < vm.otherUsers.length; i++) {
              if (vm.otherUsers[i].id == user_id) {
                vm.otherUsers[i].userGroupId = 2
                break
              }
            }
          })
          .catch(function (e) {
            vm.error_message = "Something went wrong"

          })
      },
      triggerEdit: function () {
        let vm = this
        vm.edit = !vm.edit
      }
    },
    created() {
      let vm = this
      if (!vm.$cookies.isKey("userGroup")) {
        vm.$router.push({name: "Login"})
      }

      if (vm.$cookies.get("userGroup") == 1) {
        vm.isadmin = true
        axios.get(`${vm.$datasrcURLbase}users`)
          .then(function (response) {
            let otherUsers = response.data
            vm.otherUsers = otherUsers


          })
          .catch(function (e) {
            vm.error_message = "Something went wrong"
          })
      }

      if (vm.user == "me") {
        vm.headMessage = "Your Profile"

        axios.get(`${vm.$datasrcURLbase}user/${vm.$cookies.get("user_id")}`)
          .then(function (response) {
            let user = response.data
            vm.fullname = user.fullName
            vm.email = user.email
            vm.phone = user.phoneNo
            vm.host = ""
            if (user.userGroupId < 3)
              vm.host = true
            vm.userGroupId = user.userGroupId
            axios.get(`${vm.$datasrcURLbase}usergroup/${vm.userGroupId}`)
              .then(function (response) {
                let data = response.data
                vm.userGroup = data.name


              })
              .catch(function (e) {
                vm.error_message = "Something went wrong"
              })
          })
          .catch(function (e) {
            vm.error_message = "Something went wrong"
          })
        axios.get(`${vm.$datasrcURLbase}estate/owner/${vm.$cookies.get("user_id")}`)
          .then(function (response) {
            // JSON responses are automatically parsed.
            vm.estatesData = response.data

            vm.estatesData.forEach(e => {
              axios.get(`${vm.$datasrcURLbase}asset/${e.id}/estate`)
                .then(function (response) {
                  e.img = "../assets/" + response.data[0].name
                })
                .catch(function (e) {
                  console.log(e)

                })
            })
          })
          .catch(function (e) {
            vm.error_message = "Something went wrong"
          })
        axios.get(`${vm.$datasrcURLbase}bookings/${vm.$cookies.get("user_id")}`)
          .then(function (response) {
            // JSON responses are automatically parsed.
            vm.bookingsData = response.data
            vm.bookingsData.forEach(b => {
              axios.get(`${vm.$datasrcURLbase}estate/${b.estateId}`)
                .then(function (response) {
                  console.log(response.data)
                  b.estateTitle = response.data.title
                })
                .catch(function (e) {
                  console.log(e)
                })
            })
          })
          .catch(function (e) {
            vm.error_message = "Something went wrong"
          })

      } else {
        console.log(vm.user)
        axios.get(`${vm.$datasrcURLbase}user/${vm.user}`)
          .then(function (response) {
            let user = response.data
            vm.fullname = user.fullName
            vm.email = user.email
            vm.phone = user.phoneNo
            vm.host = true
            vm.headMessage = vm.fullname + " Profile"
            axios.get(`${vm.$datasrcURLbase}usergroup/${user.userGroupId}`)
              .then(function (response) {
                let data = response.data
                vm.userGroup = data.name


              })
              .catch(function (e) {
                vm.error_message = "Something went wrong"
              })
          })
          .catch(function (e) {
            vm.error_message = "Something went wrong"
          })
      }


    },

    components: {estate}


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .profile {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 10px;
  }

  .profile_table {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 10px;
  }

  tr {
    padding: 5px;
  }

  table th {

    text-align: left;
    font-size: 1.3em;
    font-weight: bold;
    padding-bottom: 20px;
    padding-left: 20px;

  }

  table td {
    padding: 5px;
    padding-left: 20px;
    border-bottom: 1px solid #eee;

  }

  table td:nth-child(1) {
    font-weight: bold;
  }

  .title {
    flex-basis: 100%;
  }

  .estates {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
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

  .booking {
    flex-basis: 31%;
    padding-left: 1%;
    margin-left: 1%;
    margin-bottom: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: 1%;

  }

  .booking h3 , .booking span{
    width: 100%;
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

</style>
