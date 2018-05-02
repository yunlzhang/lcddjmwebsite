<template>
  <div id="app">
    <router-view :isLogin="isLogin"  @getUserInfo="getUserInfo"/>
    <div class="return-top"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-fanhuidingbu1"></use></svg></div>    
  </div>
</template>

<script>
/*版权 start*/
import './static/js/util.js';
import './static/js/copy.js';
/*  end  */

import {throttle,returnTop,cacheImg} from './static/js/common';
import Rain from './components/Rainday';
import './static/iconfont/iconfont';
var rainyDay = require('./static/js/RainyDay').RainyDay;
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
        document.addEventListener('scroll',throttle(function(){
            if(document.documentElement.scrollTop > window.innerHeight){
                document.querySelector('.return-top').style.display = 'block';
            }else{
                document.querySelector('.return-top').style.display = 'none';
            }
        },200,true),false)

        document.addEventListener('click',function(e){
            let isClickTarget = false;
            let el = document.querySelectorAll('.return-top,.return-top *');
            for(let i =0,len = el.length;i<len;i++){
                if(el[i] === e.target){
                    isClickTarget = true;
                    break;
                }
            }
            if(isClickTarget){
                returnTop();
            }
        },false)
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
           
        }
    },
    components:{Rain}
  }
</script>

<style lang="scss">
    @import './static/scss/normalize';
    #app {
        // background:rgba(255,255,255,.8);        
        color: #2c3e50;
        width: 100vw;
        font-size:16px;
        line-height:1.5;
        // background:url('./static/img/bg.jpeg');
        // background-attachment:fixed;        
        min-height:100vh;
    }
    /* loading*/
    .loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .loader {
            position: relative;
            margin: 0 auto;
            width: 100px;
            &::before {
                content: '';
                display: block;
                padding-top: 100%;
            }
        }
        .circular {
            animation: rotate2 2s linear infinite;
            height: 100%;
            transform-origin: center center;
            width: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
        .path {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
            stroke-linecap: round;
        }
    }

    /* 返回顶部 */
    .return-top{
        position: fixed;
        display: none;
        width: 40px;
        height: 40px;
        right:40px;
        bottom:40px;
        border-radius: 50%;
        border:1px solid #ccc;
        cursor: pointer;
        background:rgba(255,255,255,.8);
        font-size:30px;
        text-align: center;
        line-height: 40px;
        &:hover{
           background:rgba(204,204,204,.8); 
        }
    }

    @keyframes rotate2 {
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }

    @keyframes color {
        100%,
        0% {
            stroke: #d62d20;
        }
        40% {
            stroke: #0057e7;
        }
        66% {
            stroke: #008744;
        }
        80%,
        90% {
            stroke: #ffa700;
        }
    }
</style>
