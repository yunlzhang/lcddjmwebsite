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

<style lang="scss">
    @import './static/scss/normalize';
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        padding-top: 56px;
        color: #2c3e50;
        width: 100vw;
        height: calc(100vh - 56px);
    }
</style>
