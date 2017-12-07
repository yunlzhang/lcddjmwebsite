<template>
<div  class="signin-wrap">
    <div class="signin">
            <div class="username">
                <div class="l">昵称</div>
                <div class="r"><input type="text" v-model="signinData.name" placeholder="请输入昵称" name="nickname"></div>
            </div>
            <div class="username">
                <div class="l">密码</div>
                <div class="r"><input type="password" v-model="signinData.password" name="password" placeholder="请输入密码，6-10位"></div>
            </div>
            <div class="confirm"  @click="signin">登陆</div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'Signin',
    data() {
        return {
            signinData:{
                name:'',
                password:''
            }
        }
    },
    
    mounted: function () {
        
    },
    methods:{
        signin(){
            $.ajax({
                url:'/api/signin',
                type:'POST',
                data:this.$data.signinData,
                dataType:'json',
                success:res => {
                    console.log(res)
                }
            })
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .signin-wrap{
        width: 100%;
        height: 100%;
    }
    .signin{
        width:500px;
        background:rgba(255,255,255,.4);
        padding:40px 50px;
        border:1px solid #dee0e1;
        border-radius: 6px;
        font-size:16px;
        position: fixed;
        top: 50%;
        left: 50%;
        z-index:1;
        transform:translate(-50%,-50%);
        > div{
            display:flex;
            height:40px;
            line-height:40px;
            margin:15px 0;
            border:1px solid #dee0e1;
            overflow: hidden;
        }
        input,textarea{
            display: block;
            outline:none;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border:none;
            font-size:16px;
            line-height:40px;
            resize:none;
            background:none;
        }
        .intro{
            height:120px;
        }
        .l{
            width:100px;
            text-indent:20px;
            text-align: left;
        }
        .r{
            flex:1;
        }
        .confirm{
            height:40px;
            text-align: center;
            line-height: 40px;
            background:#00d5a0;
            justify-content: center;
            cursor: pointer;
            color:#fff;
        }
    }

</style>
