<template>
  <div id="app">
    <router-view :isLogin="isLogin" :userInfo="userInfo" @getUserInfo="getUserInfo"/>
    <Rain></Rain>
  </div>
</template>

<script>
import Rain from './components/Rainday';
import './static/iconfont/iconfont';
import "./static/js/ajax"
var rainyDay = require('./static/js/RainyDay').RainyDay;
var  bgCovers = {
    path:'http://image.lcddjm.com/qnimg/',
    names:[
        '20171010-DSC_2019.jpg',
        '20171010-DSC_2020.jpg',
        '20171010-DSC_2068.jpg',
        '20171010-DSC_2075.jpg',
        '20171010-DSC_2077.jpg',
        '20171010-DSC_2078.jpg',
        '20171010-DSC_2085.jpg',
        '20171010-DSC_2091.jpg',
        '20171010-DSC_2190.jpg',
        '20171010-DSC_2198.jpg',
        '20171010-DSC_2223.jpg',
        '20171010-DSC_2357.jpg',
        '20171011-DSC_2363.jpg',
        '20171011-DSC_2367.jpg'      
    ]
}
var engine;
  export default {
    name: 'app',
    data(){
        return {
            userInfo:'',
            isLogin:false
        }
    },
    created(){

    },
    mounted(){
        //看用户session 是否过期
        this.getUserInfo();
        this.$nextTick(function () {
            var _this = this;
            var pic = document.querySelector('#rainyday');
            pic.onload = function(){
                engine = new rainyDay({
                    image: pic,
                    height:window.innerHeight,
                    width:window.innerWidth
                });
                engine.canvas.id = "rainCanvas";
                if(~['signin','signup'].indexOf(_this.$route.name)){
                    engine.canvas.style.display = 'block';
                }else{
                    engine.canvas.style.display = 'none';
                }
                engine.rain([ [3, 3, 0.88], [5, 5, 0.9], [6, 2, 1] ], 100);
                this.crossOrigin = 'anonymous';
                this.style.visibility = "hidden";
            }
            pic.crossOrigin = "Anonymous";
            pic.src = bgCovers.path + bgCovers.names[Math.floor(Math.random()*bgCovers.names.length)];            
        })
    },
    methods:{
        getUserInfo(){

            ajax({
                url:'/api/get_user_info',
                method:'get'
            }).then(res => {
                if(res.code === 200){
                    this.userInfo = res.data;
                    this.isLogin = true;
                    sessionStorage.setItem('isLogin','1');
                }else{
                    this.userInfo = '';
                    this.isLogin = false;
                    sessionStorage.removeItem('isLogin');                    
                }
            })
        }
    },
    watch:{
        '$route':function(){
            if(!engine) return;
            if(~['signin','signup'].indexOf(this.$route.name)){
                engine.canvas.style.display = 'block';
            }else{
                engine.canvas.style.display = 'none';                
            }
        }
    },
    components:{Rain}
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
        font-size:16px;
        // height: calc(100vh - 56px);
    }
</style>
