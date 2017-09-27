<template>
  <div class="estate">
    <h1>{{ $props.estate.title }}</h1>
    <div class="info">
      <span></span>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'estate',
    props: ["estate"],
    data() {
      return {

      }
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
