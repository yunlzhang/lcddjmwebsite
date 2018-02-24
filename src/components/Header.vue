<template>
    <nav ref="nav">
        <ul class="nav">
            <li :class="active === 'blog' ? 'active' : ''"><router-link to="/">blog</router-link></li>
            <li :class="active === 'life' ? 'active' : ''"><router-link to="/">life</router-link></li>
            <li :class="active === 'intro' ? 'active' : ''"><router-link to="/">intro</router-link></li>
            <li :class="active === 'about' ? 'active' : ''"><router-link to="/about">about</router-link></li>            
        </ul>
        <div :class="packup ? 'packbtn packup' : 'packbtn'" @click="withdraw">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shouqianniuicon"></use>
            </svg>
        </div>
    </nav>
</template>
<script>
    import User from './User';
    export default {
        name:'Header',
        data(){
            return{
                packup:false
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
            withdraw(){
                if(this.packup){
                    this.$refs.nav.style.cssText += 'left:0;' 
                    document.querySelector('.main').style.cssText += 'padding-left:300px;'
                }else{
                    this.$refs.nav.style.cssText += 'left:-300px;' 
                    document.querySelector('.main').style.cssText += 'padding-left:0;'                    
                }
                this.packup = !this.packup;                
            }
        }       
    }
</script>
<style scope lang="scss">
    nav{
        height:100vh;
        width:300px;
        position:fixed;
        background:rgba(0,0,0,.3);
        transition:left 1s linear;
        left:0;
        top:0;
        line-height:56px;
        z-index:10000;
        // box-shadow: 0 1px 0 rgba(12,13,14,0.15), 0 0 0 transparent, 0 0 0 transparent, 0 0 0 transparent;
        .nav{
            // float:left;
            margin-top:60px;
            li{
                // float:left;
                // width:100px;
                text-align:center;
                a:hover{
                    color:#f00;
                }
                &.active a{
                    color:green;
                }
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