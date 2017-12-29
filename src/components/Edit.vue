<template>
    <div class="edit-wrap">
        <!--<HeaderTop :isLogin="isLogin" :userInfo="userInfo"></HeaderTop>-->
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
import HeaderTop from './Header';

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import options from '../static/config/editor_config';
console.log(options)
import { quillEditor } from 'vue-quill-editor'
export default {
    name: 'Edit',
    data() {
        return {
            content:'',
            editorOptions : options
        }
    },
    props:['isLogin','userInfo'],
    // components:{HeaderTop},
    mounted: function () {
        document.title = '编辑';
    },
    methods:{
        
    },
    components: {
        quillEditor
    }

}
</script>
<style lang="scss">
    #app{
        box-sizing:border-box;
        min-height:100vh;
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
        .ql-toolbar{
            text-align:left;
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
            min-height:400px;
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
