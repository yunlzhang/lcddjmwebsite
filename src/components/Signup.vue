<template>
<div >
    <div class="signup"  d>
            <div class="username">
                <div class="l">昵称</div>
                <div class="r"><input type="text" placeholder="请输入昵称" name="nickname"></div>
            </div>
            <div class="username">
                <div class="l">密码</div>
                <div class="r"><input type="password" name="password" placeholder="请输入密码，6-10位"></div>
            </div>
            <div class="username">
                <div class="l">确认密码</div>
                <div class="r"><input type="password" name="password" placeholder="请再次输入密码"></div>
            </div>
            <div class="intro">
                <div class="l">简介</div>
                <div class="r"><textarea name="intro" max-length="100" placeholder="简单介绍一下～不要超过100字哦" id="" cols="30" rows="10"></textarea></div>
            </div>
            <div class="confirm"  @click="signup">确认</div>
        </div>
        <Rainday></Rainday>
    </div>

</template>

<script>
import Rainday from './Rainday';
import $ from 'jquery';
export default {
    name: 'Signup',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    components:{
        Rainday
    },
    methods:{
        signup(){
            var data = {
                name:'123',
                password:'passss1',
                repassword:'passss1',
                intro:'I am I'
            };
            $.ajax({
                url:'/api/signup',
                type:'POST',
                data:data,
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
    .signup{
        width:500px;
        padding:40px 50px;
        border:1px solid #dee0e1;
        border-radius: 6px;
        font-size:16px;
        position: absolute;
        top: 50%;
        left: 50%;
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
        }
    }

</style>
