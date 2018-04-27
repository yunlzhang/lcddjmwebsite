<template>
    <div class="article-wrap">
        <div class="title">{{articleData.title}}</div>
        <div class="cover" v-if="articleData.cover"><img :src="articleData.cover" alt=""></div>
        <div class="content rich-text ql-editor">
            <div v-html="articleData.content"></div>
        </div>
        <div class="previous-next" v-if="previous || next">
            <div class="previous" v-if="previous"><router-link :to="'/article/'+previous._id">上一篇  {{previous.title}}</router-link></div>
            <div class="next" v-if="next"><router-link :to="'/article/'+next._id">下一篇  {{next.title}}</router-link></div>
        </div>
        <div class="comment-area">
            <div class="avatar"></div>
            <textarea placeholder="期待你的评论...."></textarea>
            <div class="button">
                <span class="confirm" @click="comment()">确认</span>
                <span class="cancel" >取消</span>
            </div>
        </div>
        <div class="comment">


        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.snow.css'
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
        this.articleData = {};
        this.getArticleDetail(to.params.id);
        next();
    },
    methods:{
        getArticleDetail(id){
            this.axios({
                method:'get',
                params:{
                    _id:id
                },
                url:'/api/article/get_article_detail'
            }).then(res => {
                if(res.data.code == 200){
                    this.articleData = res.data.data[1];
                    this.previous = res.data.data[0]._id  ? res.data.data[0] : '';
                    this.next = res.data.data[2]._id ? res.data.data[2] : '';
                    document.title = res.data.data[1].title; 
                    this.dealPre();   
                }
            }).catch(e => {
                console.log(e);
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
                document.querySelectorAll('pre code').forEach(function(item,index){
                    hljs.highlightBlock(item);
                })                
            })
        },
        comment(data){
            let commentData = {
                article_id:'',    
                content:'',
                parent_id:'',
                user_id:'', 
                to_user_id:''
            }
            if(!data){
                commentData.article_id = this.articleData._id;
            }else{
                commentData.article_id = data.article_id;
            }
            this.axios({
                method:'post',
                data:commentData,
                url:'/api/comment'
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
        .previous-next{
            overflow:hidden;
            margin:20px 0;
            .previous{
                float:left;
            }
            .next{
                float:right;
            }
            a:hover{
                color:aqua;
            }
        }

        .comment-area{
            height:200px;
            padding: 20px 0 80px 60px;
            box-sizing: border-box; 
            position: relative;
            .avatar{
                position: absolute;
                width:40px;
                height:40px;
                border-radius:50%;
                left:10px;
                top:20px;
                border:1px solid #ccc;
                box-sizing: border-box;

            }
            textarea{
                display: block;
                width: 100%;
                height:100px;
                padding:10px;
                box-sizing: border-box;
                border:1px solid #ccc;
                border-radius:5px;
                resize:none;
            }
            .button{
                position: absolute;
                height:40px;
                bottom: 10px;
                right: 0;
                span{
                    float:right;
                    height:100%;
                    line-height:40px;
                    margin-left:20px;
                    width:80px;
                    text-align: center;
                    cursor: pointer;
                }
                .confirm{
                    background:aqua;
                    color:#fff;
                    border-radius:20px;
                }
            }
        }
        
    }
</style>
<style lang="scss">
    .rich-text{     
        line-height:1.75;
        font-size:16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 20px;
        white-space: pre-wrap;//保留空格，正常换行
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
        a{
            color:#008cff;
        }
    }
</style>
