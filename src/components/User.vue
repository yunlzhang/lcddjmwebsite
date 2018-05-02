<template>
    <div class="userinfo-wrap" ref="userinfo-wrap">
        <div class="userinfo">
            <div class="username">昵称 : {{userInfo.name}}</div>
            <div class="signout"  @click="signout">退出登录</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'User',
    data() {
        return {
            
        }
    },
    props:['userInfo'],
    mounted: function () {
    },
    methods:{
        signout(){
            fetch('/api/signout',{
                credentials: 'include'
            }).then(response=>{
                return response.json();
            }).then(res=>{
                if(res.code === 200){
                    localStorage.removeItem('userInfo');
                    location.reload();
                }else{
                    alert(res.message);
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .userinfo-wrap{
        position:fixed;
        width:160px;
        right:0;
        top:56px;
        border-radius:5px;
        border:1px solid #dee0e1;
        display:none;
        .signout{
            cursor:pointer;
        }
    }
</style>
