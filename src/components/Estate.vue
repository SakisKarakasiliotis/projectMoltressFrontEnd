<template>
  <div class="estate">
    <!--<img src="../assets/1.jpg" alt="">-->

    <h1>{{ estate.title }}</h1>
    <div class="info">
      <span></span>
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
        estate: []
      }
    },
    created() {
      let vm = this
      axios.get(`${vm.$datasrcURLbase}estate/${vm.id}`)
        .then(function (response) {
          vm.estate = response.data
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
    background-color: red;
  }

  .estate {
    background-color: green;
  }
</style>
