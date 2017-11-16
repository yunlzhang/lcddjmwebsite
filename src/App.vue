<template>
  <div id="app">
    <HeaderTop></HeaderTop>
    <router-view/>
  </div>
</template>

<script>
  import HeaderTop from './components/Header';
  export default {
    name: 'app',
    mounted(){
    },
    components:{HeaderTop}
  }
</script>

<style>
    *{
      margin: 0;
      padding: 0;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100vw;
        height: 100vh;
    }
</style>
