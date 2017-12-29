<template>
    <header>
        <ul class="nav">
            <li><router-link to="/">blog</router-link></li>
            <li>life</li>
            <li>intro</li>
        </ul>
        <div class="right">
            <div class="user" v-if="isLogin">
                <span class="avatar" @click="showInfo"><img src="/static/img/20171010-DSC_2223.jpg" alt="" ></span>
                <!--<span class="nickname">{{userInfo.name}}</span>-->
                <User :userInfo="userInfo" ref="userInfo"></User>
            </div>
            <div class="nologin" v-else>
                <router-link to="/signup">注册</router-link> |
                <router-link to="/signin">登陆</router-link>                
            </div>
        </div>
    </header>
</template>
<script>
    import User from './User';
    export default {
        name:'Header',
        data(){
            return{
                
            };
        },
        props:["isLogin","userInfo"],
        mounted(){
            
        },
        components:{User} ,
        methods:{
            showInfo(e){
                this.$refs.userInfo.$el.style.display = this.$refs.userInfo.$el.style.display === 'block' ? 'none' : 'block';
            }
        }       
    }
</script>
<style scope lang="scss">
    header{
        height:56px;
        width:100%;
        position:fixed;
        left:0;
        top:0;
        line-height:56px;
        z-index:10000;
        box-shadow: 0 1px 0 rgba(12,13,14,0.15), 0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent;
        .nav{
            float:left;
            li{
                float:left;
                width:100px;
            }
            a{
                
            }
        }
        .right{
            float:right;
            margin-right:40px;
            .avatar{
                display:block;
                background:#ccc;
                width:40px;
                height:40px;
                margin-top:8px;
                border-radius:50%;
                overflow:hidden;
                cursor:pointer;
            }
        }
    }
</style>