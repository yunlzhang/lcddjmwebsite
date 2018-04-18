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
        <input type="file" id="upload-area" name="logo" accept="image/jpg,image/jpeg,image/png,image/gif" @change="fileChange">
    </div>
</template>

<script>

// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

import { ImageImport} from '../static/js/image-import';

import '../static/js/plupload/plupload.full.min';
import '../static/js/qiniu.min';

import options from '../static/config/editor_config';
import { quillEditor } from 'vue-quill-editor';
import Quill from 'quill'
Quill.register('modules/imageImport', ImageImport)
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
                {value: 'javascript',label: 'javascript'},
                {value:'node',label:'node'},
                {value:'webpack',label:'webpack'}
            ],
            tags: []
        }
    },
    mounted: function () {
        var _this = this;
        document.title = '编辑';
        if(this.$route.params.id){
            this.getArticleDetail();
        }
        this.uploadImg('QINIU','cover_pic/',function(obj,link){
            obj.isUpload = true;
            obj.cover = link;
            obj.$refs.coverbg.style.cssText += ''
        });
        this.scrollHandle();

        //重写编辑器的上传图片

        var imgHandler = function(f) {
            _this.addImgRange = _this.$refs.quillEditor.quill.getSelection()
            if (f) {
               document.querySelector('#upload-area').click()
            }
        }
        this.$refs.quillEditor.quill.getModule("toolbar").addHandler("image", imgHandler)
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
                    this.title = obj.title;
                    this.tags = obj.tags;
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
        uploadImg(id,path,cb){
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
                container: id, // 上传区域 DOM ID，默认是 browser_button 的父元素，
                max_file_size: '100mb', // 最大文件体积限制
                flash_swf_url: '../static/js/plupload/Moxie.swf', //引入 flash,相对路径
                max_retries: 3, // 上传失败最大重试次数
                dragdrop: true, // 开启可拖曳上传
                drop_element: id, // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
                chunk_size: '4mb', // 分块上传时，每块的体积
                auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
                init: {
                    'FilesAdded': function (up, files) {
                        plupload.each(files, function (file) {
                            // 文件添加进队列后,处理相关的事情
                        });
                    },
                    'FileUploaded': function (up, file, info) {
                        var res = JSON.parse(info.response);
                        var sourceLink = 'https://image.lcddjm.com' +'/'+ res.key; //获取上传成功后的文件的Url
                        if(typeof cb == 'function'){
                            cb(_this,sourceLink);
                        }
                    },  
                    'Error': function (up, err, errTip) {
                    },
                    'Key': function (up, file) {
                        return path+file.name
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
        },
        fileChange(e){
            let _this = this;
            let uploadArea = e.target;
            let formData = new FormData(uploadArea);
            formData.append('logo',uploadArea.files[0])
            
            let up = this.upImg(formData);
            up.then(res=>{
                let data = res.data.data
                if (data.img) { 
                    let index = _this.addImgRange != null ? _this.addImgRange.index:0 // 获取插入时的位置索引，如果获取失败，则插入到最前面
                    _this.$refs.quillEditor.quill.insertEmbed(index , 'image', data.img, Quill.sources.USER)
                    _this.$refs.quillEditor.quill.setSelection(index+1)
                    _this.$refs.quillEditor.quill.focus()
                } else {
                }
            });

            uploadArea.value = '';


        },
        upImg(formData){
            return this.axios({
                method:'post',
                data:formData,
                headers:{'Content-Type':'multipart/form-data'},
                url:'/api/upload'
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
            z-index:1000;
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
        #upload-area{
            position: fixed;
            left: -1000000px;
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
