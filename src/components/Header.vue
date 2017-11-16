<template>
    <header>
        <div class="right">
            <div class="userinfo" v-if="loginStatus">
                <span class="avatar"><img src="" alt="" ></span>
                <span class="nickname"></span>
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
                loginStatus:false
            };
        },
        mouted(){

        }
    }
</script>
<style scope lang="scss">

</style>