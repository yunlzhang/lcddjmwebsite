<template>
    <div class="article-wrap">
        <div class="title">{{articleData.title}}</div>
        <div class="cover" v-if="articleData.cover"><img :src="articleData.cover" alt=""></div>
        <div class="content rich-text ql-editor">
            <div v-html="articleData.content"></div>
        </div>
        <div class="previous-next" v-if="previous || next">
            <div class="previous" v-if="previous"><router-link :to="'/article/'+previous._id"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-pageup"></use></svg> 上一篇  {{previous.title}}</router-link></div>
            <div class="next" v-if="next"><router-link :to="'/article/'+next._id"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-pagedown"></use></svg> 下一篇  {{next.title}}</router-link></div>
        </div>
        <!-- <div class="comment-area">
            <div class="avatar"><img v-if="userInfo"  :src="userInfo.avatar" alt=""></div>
            <textarea placeholder="期待你的评论...." @focus="setActiveData(articleData)" v-model="commentContent"></textarea>
            <div class="button">
                <span class="confirm" @click="comment()">确认</span>
                <span class="cancel" >取消</span>
            </div>
        </div> -->
        <comment :userInfo="userInfo"  v-on:submitData="comment" ></comment>
        <div class="comment" v-if="comments.length">
            <div class="tit">{{articleData.comments_count}}条评论</div>
            <div v-for="(item,index) in comments" :class="index == comments.length - 1 ? 'hidden comment-item' : 'comment-item ' "  :key="item._id">
                <div class="user-info">
                    <div class="avatar"><img :src="item.user.avatar" alt=""></div>
                    <div>
                        <div class="nickname">{{item.user.name}}</div>
                        <div class="time">{{item.created_at}}</div>
                    </div>
                    <div class="comment-btn" @click="showCommentArea(index)"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-comment"></use></svg></div>
                </div>
                <div class="content">{{item.content}}</div>
                <div class="sub-comments">
                    <div class="sub-comment-item" v-for="(sub,subIndex) in  item.sub_comments" :key="sub._id">
                        <div class="content"><span>{{sub.user.name}}</span>:<span>@{{sub.to_user.name}}</span> {{sub.content}}</div>
                        <div class="time">
                            <span>{{sub.created_at}}</span> <span class="reply" @click="showCommentArea(index,subIndex)"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-replycomment"></use></svg> 回复</span>
                        </div>
                    </div>

                    <transition name="fade">
                        <comment v-if="item.show" :commentData="item.commentData" :index="index" v-on:submitData="comment" v-on:cancel="cancelComment"></comment>
                    </transition>
                    <!-- <div class="comment-area" v-if="item.show">
                        <textarea placeholder="写下你的评论...." autofocus v-model="item.commentData.commentContent"></textarea>
                        <div class="button">
                            <span class="confirm" @click="comment(index)">确认</span>
                            <span class="cancel" @click="cancelComment(index)">取消</span>
                        </div>
                    </div> -->
                </div>
            </div>
            <el-pagination
                v-if="articleData.comments_count > 10"
                layout="prev, pager, next"
                :page-size="10"
                :total="articleData.comments_count"
                @current-change="getComment">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import '../static/css/highlight.min.css'
import '../static/js/highlight.min';
import * as moment from 'moment-timezone';

/**
 * 
 * 评论组件
 * 
 */
let Comment = {
    template:`<div class="comment-area" >
                        <div class="avatar" v-if="userInfo"><img   :src="userInfo.avatar" alt=""></div>
                        <textarea :placeholder="placeholder" autofocus v-model="content"></textarea>
                        <div class="button">
                            <span class="confirm" @click="submitData">确认</span>
                            <span class="cancel" @click="cancel">取消</span>
                        </div>
                    </div>`,
    data(){
        return {
            content:'',
            placeholder:'写下你的评论...'
        }
    },
    mounted(){
        this.setPlaceholder();
    },
    props:['commentData','userInfo','index'],
    methods:{
        submitData(){
            let data = {};
            if(this.commentData){
                //子评论
                data.parent_id = this.commentData.parent_id ? this.commentData.parent_id : this.commentData._id;
                data.to_user = this.commentData.user._id;
            }
            data.content  = this.content;
            this.$emit('submitData',data);
        },
        cancel(){
            this.content = '';
            this.$emit('cancel',this.index)
        },
        setPlaceholder(){
            if(this.commentData){
                if(this.commentData.parent_id){
                    this.placeholder = '@' + this.commentData.user.name;
                }
            }
        }
    }
}
export default {
    name: 'Article',
    data() {
        return {
            articleData:{},
            previous:'',
            next:'',
            comments:[],
            userInfo:'',
            activeIndex:'',
            activeSubIndex:''
        }
    },
    mounted(){
        // document.title = 'lcddjm\'s website';
        let userInfo = localStorage.getItem('userInfo');
        this.getArticleDetail(this.$route.params.id);
        try{
            this.userInfo = JSON.parse(userInfo)
        }catch(err){
            console.log(err);
        }  
    },
    beforeRouteUpdate (to,from,next){
        this.articleData = {};
        this.getArticleDetail(to.params.id);
        next();
    },
    components:{Comment},
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
                    let comments = res.data.data[1].comments
                    this.articleData = res.data.data[1];
                    comments.length ? !function(){
                        comments.forEach((item,index) => {
                            comments[index].commentData = '';
                            comments[index].created_at = moment(item.created_at).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm');
                            if(item.sub_comments.length){
                                comments[index].sub_comments.forEach((val,idx) =>{
                                    comments[index].sub_comments[idx].created_at = moment(val.created_at).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm');
                                })
                            }
                        })
                    }() : '';
                    this.comments = comments;
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
            if(typeof data !== 'object') return;
            data.article_id = this.articleData._id;     
            data.user = this.userInfo._id;
            this.axios({
                method:'post',
                data:data,
                url:'/api/comment'
            }).then(res => {
                let comments = this.comments;
                if(res.data.code == 200){
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    if(!res.data.data.parent_id){
                        this.comments.unshift(res.data.data);
                        this.articleData.comments_count =  ++this.articleData.comments_count;
                    }else{
                        this.comments[this.activeIndex].sub_comments.push(res.data.data);
                    }
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
                console.log(res);
            })
        },
        cancelComment(index){
            this.$set(this.comments[index],'show',0);
        },
        getComment(page){
            this.axios({
                method:'get',
                params:{
                    article_id:this.$route.params.id,
                    page:page
                },
                url:'/api/comment/get_more_comments'
            })
            .then(res => {

            })
        },
        showCommentArea(index,subIndex){
            if(this.activeIndex === index && this.activeSubIndex === subIndex){
                this.$set(this.comments[index],'show',this.comments[index].show ?  0 : 1);
            }else{
                this.$set(this.comments[index],'show',1);
            }
            this.activeIndex = index;
            this.activeSubIndex = subIndex;
            console.log(index,subIndex);
            this.$set(this.comments[index],'commentData',subIndex !== undefined ? this.comments[index].sub_comments[subIndex] : this.comments[index]);
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
                color:#0db4f9;
                svg{
                    color:#0db4f9;
                }
            }
        }
    }
    .comment-area{
        height:200px;
        padding: 20px 0 60px 60px;
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
            overflow: hidden;
        }
        textarea{
            display: block;
            width: 100%;
            min-height:100px;
            padding:10px;
            font-size:16px;
            line-height:1.5; 
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
                background:#0db4f9;
                color:#fff;
                border-radius:20px;
            }
        }
    }
    .comment{
        overflow:hidden;
        .tit{
            line-height:60px;
            font-size:24px;
            font-weight: 700;
            border-bottom:1px solid  #ccc;
        }
        .comment-item{
            margin:30px 0;
            position: relative;
            &::after{
                content:'';
                display: block;
                width: 100%;
                height: 0;
                border-bottom:1px solid #ccc;
                position: absolute;
                left: 0;
                bottom: -15px;
            }
            &.hidden{
                overflow: hidden;
            }
        }
        
        .user-info{
            height:40px;
            overflow:hidden;
            position: relative;
            >div{
                float:left;
            }
            .comment-btn{
                position: absolute;
                height: 100%;
                right: 10px;
                top: 0;
                line-height:40px;
                font-size:20px;
                cursor: pointer;
            }
        }
        .avatar{
            width: 40px;
            height:40px;
            overflow: hidden;
            float:left;
            border-radius: 50%;
            margin-right:20px;
        }
        .time{
            font-size:12px;
            color:#ccc;
        }
        .content{
            margin:10px 0;
            white-space: pre-wrap;
        }
    }
    .sub-comments{
        padding-left:40px;
        position: relative;
        &::after{
            content:'';
            display: block;
            width: 4px;
            height:100%;
            background:#d9d9d9;
            position: absolute;
            left: 10px;
            top: 0;
        }
        .sub-comment-item{
            padding:10px 0;
            border-top:1px dashed #ccc;
            &:first-child{
                border: none;
            }
        }
        .comment-area{
            height:180px;
            padding:20px 0 60px 0;
        }
        .content{
            margin:5px 0; 
            span{
                color:#0db4f9;
            }
        }
        .time{
            overflow: hidden;
            span{
                float:left;
                margin-right:20px;
            }
            .reply:hover{
                color:#2c3e50;
                cursor: pointer;
            }
        }
    }
    .el-pagination{
        text-align: center;
        margin:40px 0;
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
