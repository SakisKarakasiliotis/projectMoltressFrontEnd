<template>
  <div class="estates">
    <h1>{{ headMessage }}</h1>
    <h2>{{ subtitle }}</h2>
    <estate v-for="estate in estatesData" :estate="estate" :key="estate.ownerId"></estate>
    <span class="button" v-on:click="clickme">Click me to send data</span>

  </div>
</template>

<script>
  import axios from 'axios';
  import estate from '@/components/Estate'

  export default {

    name: 'Estates',
    data() {
      return {
        headMessage: 'All the places you can stay!',
        subtitle: 'Have a look to our mazing list.',
        estatesData: []
      }
    },
    methods: {
      clickme: function () {
        let vm = this
        axios.get(`${vm.$datasrcURLbase}estate/search/greece/2012-01-01/2012-01-30`)
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            this.errors.push(e)
          })
      },
    },
    created() {
      let vm = this
      axios.get(`${vm.$datasrcURLbase}estates/1`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.estatesData = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    components: {estate}


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
