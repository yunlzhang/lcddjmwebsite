<template>
    <div class="main">
        <HeaderTop :isLogin="isLogin" :userInfo="userInfo"></HeaderTop>
    </div>
</template>

<script>
import HeaderTop from './Header';
import $ from 'jquery';
export default {
    name: 'Main',
    data() {
        return {
            
        }
    },
    props:['isLogin','userInfo'],
    components:{HeaderTop},
    mounted: function () {
        console.log(this);
    },
    methods:{
        
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    
</style>
