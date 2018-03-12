<template>
    <div class="article-wrap">
        <div class="title">{{articleData.title}}</div>
        <div class="cover" v-if="articleData.cover"><img :src="articleData.cover" alt=""></div>
        <div class="content rich-text">
            <div v-html="articleData.content"></div>
        </div>
        <div class="bottom">
            <div class="previous" v-if="previous"><router-link :to="'/article/'+previous._id">上一篇  {{previous.title}}</router-link></div>
            <div class="next" v-if="next"><router-link :to="'/article/'+next._id">下一篇  {{next.title}}</router-link></div>
        </div>
    </div>
</template>

<script>
import '../static/css/highlight.min.css'
import '../static/js/highlight.min';
export default {
    name: 'Article',
    data() {
        return {
            articleData:{},
            previous:'',
            next:''
        }
    },
    mounted: function () {
        // document.title = 'lcddjm\'s website';
        this.getArticleDetail(this.$route.params.id);
        
    },
    beforeRouteUpdate (to,from,next){
        this.getArticleDetail(to.params.id)
        next();
    },
    methods:{
        getArticleDetail(id){
            this.$http.get('/api/article/get_article_detail',{
                params:{
                    _id:id
                }
            }).then(res => {
                if(res.body.code == 200){
                    this.articleData = res.body.data[1];
                    this.previous = res.body.data[0]._id  ? res.body.data[0] : '';
                    this.next = res.body.data[2]._id ? res.body.data[2] : '';
                    document.title = res.body.data[1].title; 
                    this.dealPre();   
                }
            })
        },
        dealPre(){
            this.$nextTick(function () {
                //dom已更新
                var pres = document.querySelectorAll('pre');
                for(var i = 0,len = pres.length;i<len;i++){
                    var str = pres[i].innerHTML;
                    var newNode = util.parseDom('<pre><code>'+str+'</code></pre>');
                    pres[i].parentNode.replaceChild(newNode[0],pres[i])
                }
                hljs.initHighlighting()
                
            })
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .article-wrap{
        width:800px;
        margin:0 auto;
        overflow:hidden;
        .title{
            font-size:30px;
            margin:20px 0;
            font-weight:700;
            line-height:1.75;
        }
        .cover{
            margin:20px 0;
        }
        .bottom{
            overflow:hidden;
            margin:20px 0;
            .previous{
                float:left;
            }
            .next{
                float:right;
            }
        }
        
    }
</style>
<style lang="scss">
    .rich-text{     
        line-height:1.75;
        font-size:16px;
        blockquote{
            padding: 20px;
            background-color: #f2f2f2;
            border-left: 6px solid #b3b3b3;
            word-break: break-word;
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
            margin: 0 0 20px;
        }
        ul,ol{
            margin:10px 0;
            padding-left: 30px;
            li{
                list-style-position: outside;
            }
        }
        ol li{
            list-style-type: decimal;
        }
        ul li{
            list-style-type: disc;
        }
        a{
            color:#008cff;
        }
    }
</style>
