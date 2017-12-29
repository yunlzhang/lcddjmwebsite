<template>
    <div class="main">
        <HeaderTop :isLogin="isLogin" :userInfo="userInfo"></HeaderTop>
        <div class="mainwrap"></div>
    </div>
</template>

<script>
import HeaderTop from './Header';
import $ from 'jquery';
export default {
    name: 'Blog',
    data() {
        return {
            
        }
    },
    props:['isLogin','userInfo'],
    components:{HeaderTop},
    mounted: function () {
        document.title = 'lcddjm\'s blog';
    },
    methods:{
        
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    
</style>
