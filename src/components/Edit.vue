<template>
    <div class="edit-wrap">
        <div class="top">
            <div class="tags">
                <el-select
                    v-model="tags"
                    value-key="tags"
                    name="tags"
                    size="medium"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择文章标签">
                    <el-option
                    v-for="item in tagsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="save" @click="save">保存</div>
        </div>
        <div class="upload-cover" id="QINIU" @mouseenter="showTxt" @mouseleave="showTxt">
            <div class="bg" ref="coverbg" :style="'background:url('+cover+') center center / cover no-repeat;'" >
                <div class="img-prompt" v-if="!isUpload">
                    <div><svg class="icon" aria-hidden="true"><use xlink:href="#icon-image"></use></svg></div>
                    <div class="txt" ref="txt">添加题图</div>    
                </div>
            </div>
            <input type="file" id="qiniu-upload" accept=".jpg,.png,.gif">
        </div>
        <div class="title-input">
            <input type="text" :value="title" @blur="setTitle" placeholder="输入标题">
        </div>
        <div class="editor">
            <quillEditor
                v-model="content"
                ref="quillEditor"
                :options="editorOptions"
            ></quillEditor>
        </div>
        
    </div>
</template>

<script>

// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

import '../static/js/plupload/plupload.full.min';
import '../static/js/qiniu.min';

import options from '../static/config/editor_config';
import { quillEditor } from 'vue-quill-editor'
export default {
    name: 'Edit',
    data() {
        return {
            content:'',
            cover:'',
            title:'',
            editorOptions : options,
            id:'',
            isUpload:false,
            tagsOptions: [
                {value: 'html',label: 'html'}, 
                {value: 'css',label: 'css'},
                {value: 'javascript',label: 'javascrip'},
                {value:'node',label:'node'},
                {value:'webpack',label:'webpack'}
            ],
            tags: []
        }
    },
    mounted: function () {
        document.title = '编辑';
        if(this.$route.params.id){
            this.getArticleDetail();
        }
        this.uploadImg();
        this.scrollHandle();
    },
    methods:{
        getArticleDetail(){
            this.axios({
                type:'get',
                method:'get',
                url:'/api/article/get_article_detail',
                params:{
                    _id:this.$route.params.id
                }
            }).then(res => {
                if(res.data.code == 200){
                    let obj = res.data.data[1];
                    this.content = obj.content;
                    this.cover = obj.cover;  
                    this.title = obj.title
                    this.isUpload =  this.cover ? true : false;
                    document.title = '修改文章';    
                }
            })
        },
        showTxt(e){
            if(this.isUpload) return;
            if(e.type === 'mouseenter'){
                this.$refs.txt.style.display = 'block';
            }else{
                this.$refs.txt.style.display = 'none';
            }
        },
        uploadImg(){
            var _this = this;
            var uploader = Qiniu.uploader({
                disable_statistics_report: false, // 禁止自动发送上传统计信息到七牛，默认允许发送
                runtimes: 'html5,flash,html4', // 上传模式,依次退化
                browse_button: 'qiniu-upload', // 上传选择的点选按钮，**必需**
                get_new_uptoken: true, // 设置上传文件的时候是否每次都重新获取新的 uptoken                
                uptoken_url: '/api/gettoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
                unique_names: false,
                save_key: false,
                domain: 'http://oy02r7jyx.bkt.clouddn.com', // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
                container: 'QINIU', // 上传区域 DOM ID，默认是 browser_button 的父元素，
                max_file_size: '100mb', // 最大文件体积限制
                flash_swf_url: '../static/js/plupload/Moxie.swf', //引入 flash,相对路径
                max_retries: 3, // 上传失败最大重试次数
                dragdrop: true, // 开启可拖曳上传
                drop_element: 'QINIU', // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb', // 分块上传时，每块的体积
                auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {
                            // 文件添加进队列后,处理相关的事情
                        });
                    },
                    'BeforeUpload': function (up, file) {
                        // 每个文件上传前,处理相关的事情
                    },
                    'UploadProgress': function (up, file) {
                        // 每个文件上传时,处理相关的事情
                    },
                    'FileUploaded': function (up, file, info) {
                        // var domain = up.getOption('domain');
                        var domain = 'https://image.lcddjm.com'
                        var res = JSON.parse(info.response);
                        var sourceLink = domain +'/'+ res.key; //获取上传成功后的文件的Url
                        _this.isUpload = true;
                        _this.cover = sourceLink;
                        _this.$refs.coverbg.style.cssText += ''
                    },  
                    'Error': function (up, err, errTip) {
                        console.log(up,err,errTip)
                        
                    },
                    'UploadComplete': function () {
                        //队列文件处理完毕后,处理相关的事情
                    },
                    'Key': function (up, file) {
                        return 'cover_pic/'+file.name
                    }
                }
            });
        },
        setTitle(e){
            this.title = e.target.value;
        },
        editor(){
            return this.$refs.quillEditor.quill;
        },
        save(){
            // .replace(/\s/ig,'&nbsp;')
            this.axios({
                method:'post',
                data:{
                    content:this.content,
                    cover:this.cover,
                    title:this.title,
                    id:this.$route.params.id,
                    tags:this.tags
                },
                url:'/api/article/deal_article'
            })
            .then(res => {
                if(res.data.code == 200){
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
            })
        },
        scrollHandle:function(){
            util.addHandler(window,'scroll',function(e){
                let toolbar = document.querySelector('.ql-toolbar');
                let winScrollTop = document.documentElement.scrollTop;
                let offsetTop = toolbar.parentNode.offsetTop;
                if(offsetTop < winScrollTop + 60){
                    toolbar.classList.add('fixed');
                }else{
                    toolbar.classList.remove('fixed');                    
                }
            })
        }
    },
    components: {
        quillEditor
    }

}
</script>
<style lang="scss">
    #app{
        box-sizing:border-box;
        padding:0;
        min-height:100vh;
    }
    .edit-wrap{
        width:800px;
        margin:0 auto;
        padding-top:60px;
        position: relative;
        .upload-cover{
            height:200px;
            background:#f2f2f2;
            position:relative;
        }
        input[type="file"]{
            display:block;
            width:100%;
            height:100%;
            position:absolute;
            top:0;
            left:0;
            z-index:200;
            cursor:pointer;
            opacity:0;
        }
        .bg{
            width:100%;
            height:100%;
            position:absolute;
            top:0;
            left:0;
            z-index:100;
        }
        .img-prompt{
            position:absolute;
            top:50%;
            left:50%;
            height:57px;
            transform:translate(-50%,-50%);
            color:#bcbcbc;
            text-align:center;
            .icon{
                font-size:30px;
            }
            .txt{
                font-size:16px;
                text-align:center;
                display:none;
            }
        }
        .title-input{
            height:30px;
            margin:20px 0;
            input{
                width:100%;
                height:100%;
                font-size:24px;
                text-align:left;
            }
        }
        .top{
            height:60px;
            position:fixed;
            background:#fff;
            top:0;
            left:50%;
            width:800px;
            margin-left:-400px;
            z-index:10000;
            border-bottom:1px solid #dee0e1;
        }
        .tags{
            float:left;
            margin-top:10px;
        }
        .save{
            float:right;
            width:120px;
            height:40px;
            margin:10px;
            line-height:40px;
            border:1px solid #dee0e1;
            text-align:center;
            border-radius:3px;
            &:hover{
                color:#222c37;
                border-color:#222c37;
            }

        }
        .el-input__inner{
            width:500px;
        }
    }
    .quill-editor .ql-toolbar .ql-formats{
        &:last-child{
            border-right:none;
        }
        margin-right:0;
        padding: 0 5px;
        border-right:1px solid #dee0e1;
        
    }
    .quill-editor{
        padding-top:44px;
        position: relative;
        .ql-toolbar{
            text-align:left;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background:#fff;
            z-index:1;
            &.fixed{
                position: fixed;
                width:800px;
                top:61px;
                left:50%;
                transform:translateX(-50%);
            }
        }
        .ql-picker{
            border:1px solid #dee0e1;
            margin:0 5px;
        }
        .ql-toolbar button{
            border:1px solid #dee0e1;
            margin: 0 5px;
        }
        .ql-editor{
            min-height:300px;
            font-size:16px;
            blockquote{
                margin:0;
            }        
        }
    }
    
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .ql-toolbar .ql-formats{
        margin-right:0;
    }
</style>
