<template>
  <div id="app">
    <router-view :isLogin="isLogin"  @getUserInfo="getUserInfo"/>
  </div>
</template>

<script>
/*版权 start*/
import './static/js/util.js';
import './static/js/copy.js';
/*  end  */


import Rain from './components/Rainday';
import './static/iconfont/iconfont';
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
            isLogin:false
        }
    },
    mounted(){
        //看用户session 是否过期
        this.getUserInfo();
    },
    methods:{
        getUserInfo(){
            this.axios.get('/api/get_user_info').then(res => {
                if(res.data.code === 200){
                    this.isLogin = true;
                    this.GLOBALDATA.isLogin = true;                    
                    localStorage.setItem('userInfo',JSON.stringify(res.data.data));
                }else{
                    this.isLogin = false;
                    this.GLOBALDATA.isLogin = false;
                    localStorage.removeItem('userInfo');                    
                }
            })
        }
    },
    watch:{
        '$route':function(){
            // if(!engine) return;
            // if(~['signin','signup'].indexOf(this.$route.name)){
            //     engine.canvas.style.display = 'block';
            // }else{
            //     engine.canvas.style.display = 'none';                
            // }
        }
    },
    components:{Rain}
  }
</script>

<style lang="scss">
    @import './static/scss/normalize';
    #app {
        color: #2c3e50;
        width: 100vw;
        font-size:16px;
        line-height:1.5;
        // background:url('./static/img/bg.jpeg');
        // background-attachment:fixed;        
        min-height:100vh;
    }
</style>
