<template>
    <div class="main">
        <HeaderTop :isLogin="isLogin" :userInfo="userInfo"></HeaderTop>
        <img class="not" src="/static/img/404.jpg">
    </div>
</template>

<script>
import HeaderTop from './Header';
export default {
    name: 'Notfind',
    data() {
        return {
            
        }
    },
    props:['isLogin','userInfo'],
    components:{HeaderTop},
    mounted: function () {
    },
    methods:{
        
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .not{
        margin-top:20px;
    }
</style>
