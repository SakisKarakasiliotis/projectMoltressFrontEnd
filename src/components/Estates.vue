<template>
  <div class="estates" v-if="!showsingle">
    <h1>{{ headMessage }}</h1>
    <h2>{{ subtitle }}</h2>
    <estate v-for="estate in estatesData" :estate="estate" :key="estate.ownerId"></estate>
    <form enctype="multipart/form-data" novalidate>

      <input type="file" name="file" id="file" v-bind="file">
      <span class="button" v-on:click="clickme">Click me to send data</span>
    </form>
  </div>
  <div class="estates" v-else>
    <h1>{{ headMessage }}</h1>

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
        showsingle: false
      }
    },
    computed: {
      estate: function () {
        return this.$route.params.location

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
    },
    created() {
      let vm = this
      if (vm.estate == "all") {
        axios.get(`${vm.$datasrcURLbase}estates`)
          .then(response => {
            // JSON responses are automatically parsed.
            this.estatesData = response.data
            console.log(response.data);
            vm.showsingle = false

          })
          .catch(e => {
            this.errors.push(e)
          })
      }else{
        axios.get(`${vm.$datasrcURLbase}estate/${vm.estate}`)
          .then(response => {
            // JSON responses are automatically parsed.
            this.estatesData = response.data
            vm.showsingle = true
            console.log(response.data);
          })
          .catch(e => {
            this.errors.push(e)
          })
      }

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
