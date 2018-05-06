<template>
    <nav ref="nav">
        <ul class="nav-inner">
            <li :class="active === 'work' ? 'active' : ''"><router-link to="/">blog</router-link></li>
            <li :class="active === 'life' ? 'active' : ''"><a href="//hobby.lcddjm.com" target="_blank">hobby</a></li>
            <li :class="active === 'intro' ? 'active' : ''"><router-link to="/me">about me</router-link></li>
            <li :class="active === 'about' ? 'active' : ''"><router-link to="/about">license</router-link></li>            
        </ul>
        <div class="right">
            <div class="search" @click="triggerSearch">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-search"></use>
                </svg>    
            </div>
            <div class="user" v-if="isLogin">
                <span class="avatar" @click="showInfo"><img :src="userInfo.avatar" alt="" ></span>
                <User :userInfo="userInfo" ref="userInfo"></User>
            </div>
            <div class="nologin" v-else>
                <router-link to="/signup">注册</router-link> |
                <router-link to="/signin">登陆</router-link>                
            </div>
        </div>
    </nav>
</template>
<script>
    import User from './User';
    export default {
        name:'Header',
        data(){
            return{
                
            };
        },
        props:["isLogin","userInfo",'active'],
        mounted(){
        },
        components:{User} ,
        methods:{
            showInfo(e){
                this.$refs.userInfo.$el.style.display = this.$refs.userInfo.$el.style.display === 'block' ? 'none' : 'block';
            },
            triggerSearch(){
                this.$emit('showSearch');
            }
        }       
    }
</script>
<style scope lang="scss">
    nav{
        width:100%;
        min-width:940px;
        padding:0 40px;
        box-sizing: border-box;
        height:60px;
        line-height: 60px;
        box-shadow: 0 1px 0 rgba(12,13,14,0.15), 0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent;
        position: fixed;
        top: 0;
        left: 50%;
        background: #f8f8f9;
        z-index: 1000;
        transform: translateX(-50%);
        .nav-inner{
            li{
                float:left;
                width:100px;
                text-align:center;
                a:hover{
                    color:#0db4f9;
                }
                &.active a{
                    color:#0db4f9;
                }
            }
            
            a{
                
            }
        }
        .right{
            float:right;
            >div{
                float:left;
            }
            .search{
                font-size:24px;
                cursor:pointer;
                padding-right:80px;
                position: relative;
                &::after{
                    content:'';
                    display: block;
                    width: 0;
                    height:20px;
                    position: absolute;
                    right:40px;
                    top:20px;
                    border-right:1px solid #ccc;
                }
            }
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
        .packbtn{
            width:40px;
            height:40px;
            position:absolute;
            right:0;
            top:0;
            text-align:center;
            line-height:40px;
        }
        .packbtn.packup{
            position:fixed;
            left:0;
        }

    }
</style>