<template>
  <div class="estates">
    <h1>{{ headMessage }}</h1>
    <h2>{{ subtitle }}</h2>
    <estate v-for="estate in estatesData" :estate="estate" :key="estate.ownerId"></estate>
    <div class="paging" v-if="maxPage > 1">
      <span class="previous" v-bind:class="{disabled: isPrvDisabled}" v-on:click="changePage(1)">◀ Previous</span>
      <span class="next" v-on:click="changePage(0)" v-bind:class="{disabled: isNxtDisabled}">Next ▶</span>
    </div>
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
        subtitle: 'Have a look to our amazing list.',
        estatesData: [],
        file: "",
        page: 1,
        maxPage: 1,
        isPrvDisabled: true,
        isNxtDisabled: false
      }
    },
    computed: {
      estate: function () {
        if (this.$route.params.location != "") {
          return this.$route.params.location
        }
        return "all"
      },
      start: function () {
        return this.$route.params.start
      },
      end: function () {
        return this.$route.params.end
      }
    },
    methods: {
      clickme: function () {
        let vm = this

//        axios.get(`${vm.$datasrcURLbase}estate/search/greece/2012-01-01/2012-01-30`)
//          .then(response => {
//            console.log(response)
//          })
//          .catch(e => {
//            this.errors.push(e)
//          })
        var formData = new FormData();
        console.log(this.file)
        formData.append("file", this.file, "dkjhf");
        console.log(formData)
        const config = {
          headers: {'content-type': 'multipart/form-data'}
        }
        axios.post(`${vm.$datasrcURLbase}upload`, formData, config)
          .then(response => {
            console.log(response)
          })
          .catch(e => {
            this.errors.push(e)
          })

//        var xhr = new XMLHttpRequest();
//        xhr.addEventListener('progress', function(e) {
//          var done = e.position || e.loaded, total = e.totalSize || e.total;
//          console.log('xhr progress: ' + (Math.floor(done/total*1000)/10) + '%');
//        }, false);
//        if ( xhr.upload ) {
//          xhr.upload.onprogress = function(e) {
//            var done = e.position || e.loaded, total = e.totalSize || e.total;
//            console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done/total*1000)/10) + '%');
//          };
//        }
//        xhr.onreadystatechange = function(e) {
//          if ( 4 == this.readyState ) {
//            console.log(['xhr upload complete', e]);
//          }
//        };
//        xhr.open('post', `${vm.$datasrcURLbase}upload`, true);
//        var formData = new FormData();
//        formData.append("file", this.file);
//        xhr.send(formData);
      },
      changePage: function (previous) {
        let vm = this
        if (previous) {
          if (vm.page > 1) {
            vm.isPrvDisabled = false
            vm.page--
          }
          else {
            vm.isPrvDisabled = true
          }
        } else {
          if (vm.page < vm.maxPage) {
            vm.isNxtDisabled = false
            vm.page++
          } else {
            vm.isNxtDisabled = true

          }
        }
      },
      populateEstates: function () {
        let vm = this
        axios.get(`${vm.$datasrcURLbase}estate/count`)
          .then(r => {
            vm.maxPage = r.data
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
          if (vm.location != "any") {
            axios.get(`${vm.$datasrcURLbase}estate/search/${vm.estate}/${vm.start}/${vm.end}`)
              .then(function (response) {
                // JSON responses are automatically parsed.
                vm.estatesData = response.data
                if (!vm.estatesData.length) {
                  axios.get(`${vm.$datasrcURLbase}estates/${vm.page}`)
                    .then(function (response) {
                      vm.estatesData = response.data
                    })
                    .catch(function (e) {
                      console.log(e)
                    })
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
      },
    },

    created() {
      let vm = this
      vm.populateEstates()
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
