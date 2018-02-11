<template>
    <div class="main">
        <HeaderTop :isLogin="isLogin" :active="'blog'" :userInfo="userInfo"></HeaderTop>
        <div class="main-wrap">
            <ul class="article_lists">
                <li class="article_item" v-for="item in article">
                    <router-link :to="'/article/'+item._id">
                        <div class="title" v-if="item.title">{{item.title}}</div>
                        <div class="cover" v-if="item.cover"><img :src="item.cover" alt=""></div>
                        <div class="des">{{item.des}}</div>
                        <div class="create"><span class="l">发表于 {{item.created_at}}</span></div>
                    </router-link>
                </li>
            </ul>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="articleLength"
                @current-change="pageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import HeaderTop from './Header';
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
        console.log(this);
        document.title = 'lcddjm\'s website';
        this.getArticleLength();
        this.getArticle({
            page:1,
            num:10
        });
    },
    methods:{
        getArticleLength(){
            this.$http.get('/api/article/get_article_length').then(res => {
                if(res.body.code == 200){
                    this.articleLength = res.body.article_length;
                }
            })
        },
        getArticle(data){
            this.$http.get('/api/article/get_article',{
                params:data
            }).then(res => {
                if(res.body.code == 200){
                    this.article = res.body.data;
                }
            })
        },
        pageChange(page){
            document.documentElement.scrollTop = 0            
            this.getArticle({
                page:page,
                num:10
            });
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .main{
        margin-top:56px;
    }
    .main-wrap{
        width:600px;
        margin:0 auto;
        .article_lists{
            text-align:left;
            margin:40px 0;
        }
        .article_item{
            padding:30px 0;
            border-bottom:1px solid #ccc;
            .title{
                font-weight:700;
                font-size:24px;
                line-height:1.75;
            }
            .cover{
                margin:10px 0;
            }
            .create{
                margin:20px 0;
                color:#ababab;
            }
        }
    }
    .el-pagination{
        margin:80px 0;
        text-align:center;
    }
</style>
