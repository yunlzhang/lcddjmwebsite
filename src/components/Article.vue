<template>
<div>
    <div v-show="loading" class="article-wrap">
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
        <comment :userInfo="userInfo" :showAvatar="1"  v-on:submitData="comment" ></comment>
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
                    <div class="add-comment" v-if="item.sub_comments.length" >
                        <span class="add" @click="showCommentArea(index)"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-replycomment"></use></svg> 添加新评论</span>
                        <span class="line" v-if="item.last">|</span>
                        <span v-if="item.last">还有{{item.last}}条评论，<em @click="getMoreSubComments(item._id,item.last_id,item.last,index)">点击查看</em></span>
                    </div>
                    <transition name="fade">
                        <comment v-if="item.show"  :commentData="item.commentData" :index="index" v-on:submitData="comment" v-on:cancel="cancelComment"></comment>
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
    <div v-if="!loading" class="showbox loading">
        <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" />
            </svg>
        </div>
    </div>
</div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import '../static/css/vs2015.css'
import '../static/js/highlight.min';
import {cacheImg} from '../static/js/common';
import * as moment from 'moment-timezone';
/**
 * 
 * 评论组件
 * 
 */
let Comment = {
    template:`<div class="comment-area" >
                        <div class="avatar" v-if="showAvatar">
                            <img v-if="userInfo" :src="userInfo.avatar" alt="">
                            <svg v-else class="icon" aria-hidden="true">
                                <use xlink:href="#icon-xiugaigerentouxiang-"></use>
                            </svg>
                        </div>
                        <textarea :placeholder="placeholder" @click="checkLogin" v-model="content"></textarea>
                        <div class="button">
                            <span class="confirm" @click="submitData">确认</span>
                            <span class="cancel" @click="cancel">取消</span>
                        </div>
                    </div>`,
    data(){
        return {
            content:'',
            comment:{},
            placeholder:'写下你的评论...'
        }
    },
    beforeCreate(){
        document.querySelector('body').classList.add('article');
    },
    mounted(){
        this.comment = this.commentData;
        this.setPlaceholder();
    },
    beforeDestroy(){
        document.querySelector('body').classList.remove('article');
    },
    // updated(){
    //     this.setPlaceholder();        
    // },
    props:['commentData','showAvatar','userInfo','index','test'],
    watch: {
        commentData:{
            deep:true,
            handler:function(val,oldVal){
                this.setPlaceholder();
            }
        }
    },
    methods:{
        submitData(){
            let data = {};
            if(this.commentData){
                //子评论
                data.parent_id = this.commentData.parent_id ? this.commentData.parent_id : this.commentData._id;
                data.to_user = this.commentData.user._id;
            }
            data.content  = this.content;
            this.content = '';
            this.$emit('submitData',data);
        },
        checkLogin(){
            if(!this.GLOBALDATA.isLogin){
                this.$confirm('您尚未登录,未登录将已游客身份参与评论', '提示', {
                    confirmButtonText: '去登陆',
                    cancelButtonText: '游客评论',
                    type: 'warning'
                })
                .then(() => {
                    // 去登陆
                    this.$router.push('/signin')
                })
                .catch(() => {
                    
                });
            }
        },
        cancel(){
            this.content = '';
            this.$emit('cancel',this.index)
        },
        setPlaceholder(){
            if(this.commentData){
                if(this.commentData.parent_id){
                    this.placeholder = '@' + this.commentData.user.name;
                }else{
                    this.placeholder = '写下你的评论...';
                }
            }
        }
    }
}

//缓存图片

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
            activeSubIndex:'',
            loading:false,
            test:1
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
        // let img = cacheImg('/cover/8e9b2930-4b6a-11e8-b5e6-2794361b596e.jpeg')
        // document.querySelector('body').style.cssText += `background:url(${img}) center top / 100%;background-attchment:fixed;`;


    },
    beforeRouteUpdate (to,from,next){
        this.articleData = {};
        this.loading  = false;
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
                url:this.HOST + '/article/get_article_detail'
            }).then(res => {
                if(res.data.code == 200){
                    let comments = res.data.data[1].comments
                    this.articleData = res.data.data[1];
                    comments.length ? (
                        comments.forEach((item,index) => {
                            comments[index].commentData = '';
                            comments[index].created_at = this.dateFormat(item.created_at);
                            if(item.sub_comments.length){
                                comments[index].sub_comments.forEach((val,idx) =>{
                                    comments[index].sub_comments[idx].created_at = this.dateFormat(val.created_at);
                                })
                                //获取剩余的二级评论
                                comments[index].last_id =  item.sub_comments[item.sub_comments.length-1]._id;
                                comments[index].last =  item.sub_comments_count - item.sub_comments.length;
                            }
                        })) : '';
                    this.comments = comments;
                    this.previous = res.data.data[0]._id  ? res.data.data[0] : '';
                    this.next = res.data.data[2]._id ? res.data.data[2] : '';
                    document.title = res.data.data[1].title; 
                    this.dealPre(); 
                    this.loading = true;  
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
            if(!this.userInfo){
                data.user = '5aee3cacc116b42f8b5845b9';//游客
            }else{
                data.user = this.userInfo._id;
            }   
            this.axios({
                method:'post',
                data:data,
                url:this.HOST + '/comment'
            }).then(res => {
                let comments = this.comments;
                if(res.data.code == 200){
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    res.data.data.created_at = this.dateFormat(res.data.data.created_at);
                    if(!res.data.data.parent_id){
                        this.comments.unshift(res.data.data);
                        this.articleData.comments_count =  ++this.articleData.comments_count;
                    }else{
                        this.comments[this.activeIndex].sub_comments.push(res.data.data);
                        this.comments[this.activeIndex].sub_comments.comments_count = ++this.comments[this.activeIndex].sub_comments.comments_count;
                    }
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
                for(let i = 0,len = this.comments.length;i<len;i++){
                    if(this.comments[i]._id == data.parent_id){
                        this.$set(this.comments[i],'show',0);
                        break;
                    }
                }
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
                url:this.HOST + '/comment/get_more_comments'
            })
            .then(res => {
                if(res.data.code == 200){
                    let comments = res.data.comments;
                    comments.forEach((item,index) => {
                        comments[index].commentData = '';
                        comments[index].created_at = this.dateFormat(item.created_at);
                        if(item.sub_comments.length){
                            comments[index].sub_comments.forEach((val,idx) =>{
                                comments[index].sub_comments[idx].created_at = this.dateFormat(val.created_at);
                            })
                            comments[index].last_id =  item.sub_comments[item.sub_comments.length-1]._id;
                        }
                    })
                    document.documentElement.scrollTop = document.querySelector('.comment').offsetTop;
                    this.comments = comments;
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
            })
        },
        getMoreSubComments(parent_id,last_id,last,index){
            this.axios({
                method:'get',
                params:{
                    article_id:this.$route.params.id,
                    parent_id:parent_id,
                    last_id:last_id,
                    count:last
                },
                url:this.HOST + '/comment/get_more_sub_comments'
            })
            .then(res => {
                if(res.data.code == 200){
                    let subComments = res.data.sub_comments;
                    subComments.forEach((item,index) =>{
                        subComments[index].created_at = this.dateFormat(item.created_at);
                    })
                    this.comments[index].last = 0;
                    this.comments[index].sub_comments = this.comments[index].sub_comments.concat(subComments);
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
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
            //触发重新渲染
            let newComment = this.comments.concat([]);
            newComment[index].commentData = Object.assign({},subIndex !== undefined ? this.comments[index].sub_comments[subIndex] : this.comments[index]);
            this.comments = newComment;
        },
        dateFormat(isoDate){
            return moment(isoDate).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm');
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
            margin:40px 0 20px;
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
            text-align: center;
            line-height:38px;
            font-size:40px;
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
            background: transparent;
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
        .add-comment{
            overflow: hidden;
            .add{
                cursor: pointer;
            }
            span{
                float:left;
                font-size:14px;
                margin-right:10px;
                color:#969696;
            }
            em{
                color:#0db4f9;
                cursor: pointer;
            }
        }
    }
    .el-pagination{
        text-align: center;
        margin:40px 0;
        *{
            background: none!important;
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
