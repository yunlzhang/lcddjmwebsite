<template>
    <div class="main">
        <HeaderTop :isLogin="isLogin" :active="'work'" :userInfo="userInfo" v-on:showSearch="triggerSearch"></HeaderTop>
        <div id="particles-js"></div>
        <div v-if="!loading" class="showbox loading">
            <div class="loader">
                <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
                </svg>
            </div>
        </div>
        <div v-else class="main-wrap" ref="main">
            <ul class="article-lists" v-if="article.length">
                <li class="article-item" v-for="item in article" v-bind:key="item._id">
                    <router-link :to="'/article/'+item._id">
                        <div class="title" v-if="item.title"><span>{{item.title}}</span></div>
                        <!--<div class="cover" v-if="item.cover"><img :src="item.cover" alt=""></div>-->
                        <div class="des">{{item.des}}</div>
                        <ul class="create">
                            <li>发表于 {{item.created_at}}</li>
                            <li v-if="item.tags.length"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-cc-tag-more"></use></svg> {{item.tags.toString()}}</li>
                            <li v-if="item.comments_count"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-iconfontpinglun"></use></svg> {{item.comments_count}}</li>
                            <li v-if="item.pv"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-fangwenliang"></use></svg> {{item.pv}}</li>                            
                        </ul>
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
        <transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">
            <div class="search-wrap" v-show="showSearchPage">
                <div class="close" @click="triggerSearch">&times;</div>
                <div class="search-result">
                    <div class="search-area">
                        <input type="text" v-model="searchKey" placeholder="请输入搜索内容">
                        <div class="search-icon">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-search"></use>
                            </svg>
                        </div>
                    </div>
                    <ul v-if="searchData.length">
                        <li v-for="item in searchData" :key="item._id">
                            <router-link :to="'/article/'+item._id">
                                <div class="title" v-if="item.title"><span>{{item.title}}</span></div>
                                <div>
                                    <span>发表于 {{item.created_at}}</span>
                                    <span v-if="item.tags.length"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-cc-tag-more"></use></svg> {{item.tags.toString()}}</span>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                    <div class="vacant" v-if="vacant">
                        没有查询到数据
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import HeaderTop from './Header';
import '../static/js/particles';
import {debounce} from '../static/js/common';
let _this;
export default {
    name: 'Blog',
    data() {
        return {
            article:[],
            articleLength:0,
            loading:false,
            showSearchPage:false,
            searchData:'',
            searchKey:'',
            vacant:false
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
        _this = this;
    },
    updated(){
        this.$nextTick(()=>{
      
        })
    },
    watch:{
        searchKey:{
            handler:debounce(function (){
                _this.getSearchData(_this.searchKey);
            },500,false)
        }
    },
    methods:{
        getIndexData(data){
            this.axios({
                method: 'get',
                params:data,
                url:this.HOST + '/article/get_index_data'
            }).then(res=>{
                if(res.data.code == 200){
                    this.articleLength = res.data.article_length;
                    this.article = res.data.article_data;
                    this.loading = true;
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
                url:this.HOST + '/article/get_article'
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
            this.article = [];
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
        triggerSearch(){
            this.showSearchPage = !this.showSearchPage;
        },
        getSearchData(key,page=0,num=5){
            this.vacant = false;
            this.axios({
                method:'get',
                params:{
                    key,
                    page,
                    num
                },
                url:this.HOST + '/search'
            })
            .then(res => {
                if(res.data.code == 200){
                    this.searchData = res.data.data;
                    if(!res.data.data.length){
                        this.vacant = true;
                    }
                }
            })
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
    #particles-js{
        position: fixed;
        width:100%;
        height:100%;
    }
    .main-wrap{
        width:800px;
        position: relative;
        margin:0 auto;
        .article-lists{
            text-align:left;
            // margin:20px 0;
        }
        .article-item{
            padding:15px;
            border:1px solid #ccc;
            border-radius:5px;
            margin:20px 0;
            &:hover{
                box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1);
            }
            .title{
                font-weight:700;
                font-size:24px;
                line-height:1.75;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                width:100%;
                span{
                    float:left;
                    position:relative;
                    &::after{
                        content: " ";
                        position: absolute;
                        width: 100%;
                        height: .1em;
                        bottom: 5px;
                        left: 0;
                        background: #26272b;
                        transform: scaleX(0);
                        transition: .3s ease-in-out;
                        
                    }
                    &:hover{
                        &::after{
                            transform: scaleX(1);
                        }
                    }
                }
            }
            .cover{
                margin:10px 0;
            }
            .des{
                word-wrap:break-word;
                word-break:break-all;
            }
            .create{
                margin:10px 0 0;
                color:#ababab;
                overflow: hidden;
                li{
                    float:left;
                    margin-right:20px;
                }
            }
        }
    }
    .search-wrap{
        // display: none;
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        background:rgba(0,0,0,.7);
        z-index: 100;
        .close{
            width:80px;
            height:80px;
            line-height:80px;
            text-align: center;
            font-size:40px;
            color:#fff;
            position: absolute;
            right:0;
            top:0;
            cursor: pointer;
        }
        .search-result{
            width:800px;
            position: relative;
            border-radius:10px;
            margin:5vh auto;
            height:90vh;
            overflow: hidden;
            background: #fff;
            padding: 20px 40px;
            box-sizing:border-box;
        }
        .search-area{
            overflow: hidden;
            input{
                float:left;
                width:640px;
                height:50px;
                line-height:50px;
                padding-left:25px;
                font-size:18px;
                border-radius:50px 0 0 50px;
                border:1px solid #ccc;
                border-right:none;
            }
            .search-icon{
                float:left;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size:20px;
                border-radius:0 50px 50px 0;
                border:1px solid #ccc;
                border-left:none;
            }
            
        }
        ul{
            position: absolute;
            top:92px;
            bottom:20px;
            left:40px;
            right:40px;
            overflow:scroll;
            li{
                line-height:1.5;
                padding:20px 0;
                border-bottom:1px dashed #ccc;
            }
            
        }
        .vacant{
            line-height:200px;
            text-align: center;
            font-size:40px;
        }
        
    }
</style>
<style>
.el-pagination{
        margin:40px 0;
        text-align:center;
    }
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
        margin:0 10px;
        min-width:40px;
    }
    .el-pager li{
        height:40px;
        line-height:40px;
        font-size:16px;
    }
    .el-pagination button, .el-pagination span:not([class*=suffix]){
        height:40px;
        line-height:40px;
        font-size:16px;
    }
    .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{
        font-size:16px;
    }
    .el-pagination.is-background .el-pager li.active{
        background:#0db4f9!important;
    }
</style>
