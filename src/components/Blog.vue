<template>
    <div class="main">
        <!--<HeaderTop :isLogin="isLogin" :active="'work'" :userInfo="userInfo"></HeaderTop>-->
        <div id="particles-js"></div>
        <div class="main-scroll">
            <div class="main-wrap" ref="main">
                <ul class="article_lists">
                    <li class="article_item" v-for="item in article" v-bind:key="item._id">
                        <router-link :to="'/article/'+item._id">
                            <div class="title" v-if="item.title">{{item.title}}</div>
                            <!--<div class="cover" v-if="item.cover"><img :src="item.cover" alt=""></div>-->
                            <div class="des">{{item.des}}</div>
                            <div class="create"><span class="l">发表于 {{item.created_at}}</span></div>
                        </router-link>
                    </li>
                </ul>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="5"
                    :total="articleLength"
                    @current-change="pageChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderTop from './Header';
import '../static/js/particles';
export default {
    name: 'Blog',
    data() {
        return {
            article:[],
            articleLength:0
        }
    },
    props:['isLogin','userInfo'],
    components:{HeaderTop},
    mounted: function () {
        document.title = 'lcddjm\'s website';
        this.getIndexData({
            page:1,
            num:5
        });
        this.particle();
    },
    methods:{
        getIndexData(data){
            this.axios({
                method: 'post',
                data:data,
                url: '/api/article/get_index_data'
            }).then(res=>{
                if(res.data.code == 200){
                    this.articleLength = res.data.article_length;
                    this.article = res.data.article_data;
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
            })
        },
        getArticle(data){
            this.axios({
                method:'get',
                params:data,
                url:'/api/article/get_article'
            }).then(res=>{
                if(res.data.code == 200){
                    this.article = res.data.data;
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
            })
        },
        pageChange(page){
            this.scrollTopAnimate('.main-scroll');
            this.getArticle({
                page:page,
                num:5
            });
        },
        particle(){
            particlesJS("particles-js", {
                particles: {
                    number: {
                        value: 40,
                        density: {
                            enable: !0,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#399c9c"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        },
                        polygon: {
                            nb_sides: 5
                        }
                    },
                    opacity: {
                        value: .3,
                        random: !1,
                        anim: {
                            enable: !1,
                            speed: 1,
                            opacity_min: .2,
                            sync: !1
                        }
                    },
                    size: {
                        value: 20,
                        random: !0,
                        anim: {
                            enable: !1,
                            speed: 30,
                            size_min: .1,
                            sync: !1
                        }
                    },
                    line_linked: {
                        enable: !0,
                        distance: 250,
                        color: "#40afaf",
                        opacity: .3,
                        width: 1
                    },
                    move: {
                        enable: !0,
                        speed: 3,
                        direction: "none",
                        random: !0,
                        straight: !1,
                        out_mode: "out",
                        bounce: !0,
                        attract: {
                            enable: !1,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: !0,
                            mode: "grab"
                        },
                        onclick: {
                            enable: !0,
                            mode: "push"
                        },
                        resize: !0
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1
                            }
                        }
                    }
                },
                retina_detect: !0
            });
        },
        scrollTopAnimate(selector){
            let timer;
            scrollTop();
            function scrollTop(){
                timer = setTimeout(function(){
                    let top = document.querySelector(selector).scrollTop;
                    let speed = Math.floor(-top / 7);
                    document.querySelector(selector).scrollTop = top + speed;
                    if(top == 0){
                        clearTimeout(timer);
                    }else{
                        scrollTop();
                    }
                },30);
            }   
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .main{
        // padding-left:300px;
        overflow:hidden;
        transition:padding 1s linear;
    }
    .main-scroll{
        max-height:100vh;
        width:100%;
        position: absolute;
        background:rgba(0,0,0,.02);
        top:0;
        left:0;
        overflow-y:auto;
    }
    .main-wrap{
        width:600px;
        margin:0 auto;
        .article_lists{
            text-align:left;
            // margin:20px 0;
        }
        .article_item{
            padding:15px 0;
            border-bottom:1px solid #ccc;
            .title{
                font-weight:700;
                font-size:24px;
                line-height:1.75;
            }
            .cover{
                margin:10px 0;
            }
            .des{
                word-wrap:break-word;
                word-break:break-all;
            }
            .create{
                margin:10px 0;
                color:#ababab;
            }
        }
    }
    .el-pagination{
        margin:80px 0;
        text-align:center;
    }
</style>
