<template>
    <header>
        <div class="right">
            <div class="userinfo" v-if="isLogin">
                <span class="avatar"><img src="" alt="" ></span>
                <span class="nickname">{{userInfo.name}}</span>
            </div>
            <div class="nologin" v-else>
                <router-link to="signup">注册</router-link> |
                <router-link to="signin">登陆</router-link>                
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        name:'Header',
        data(){
            return{
                
            };
        },
        props:["isLogin","userInfo"],
        mounted(){
            console.log(this)
            console.log('header');
        }
    }
</script>
<style scope lang="scss">
    header{
        height:56px;
        width:100%;
        position:fixed;
        left:50%;
        top:0;
        min-width:960px;
        line-height:56px;
        transform:translateX(-50%);
        z-index:10000;
        box-shadow: 0 1px 0 rgba(12,13,14,0.15), 0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent;
        .right{
            float:right;
            margin-right:40px;
        }
    }
</style>