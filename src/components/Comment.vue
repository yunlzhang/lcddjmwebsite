<template>
    <div class="comment-area">
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
    </div>
</template>

<script>
    /**
     * 
     * 评论组件
     * 
     */
    export default {
        name: 'Comment',
        data() {
            return {
                content: '',
                comment: {},
                placeholder: '写下你的评论...'
            }
        },
        beforeCreate() {
            //document.querySelector('body').classList.add('article');
        },
        mounted() {
            this.comment = this.commentData;
            this.setPlaceholder();
        },
        beforeDestroy() {
            document.querySelector('body').classList.remove('article');
        },
        props: ['commentData', 'showAvatar', 'userInfo', 'index', 'test'],
        watch: {
            commentData: {
                deep: true,
                handler: function (val, oldVal) {
                    this.setPlaceholder();
                }
            }
        },
        methods: {
            submitData() {
                let data = {};
                if (this.commentData) {
                    //子评论
                    data.parent_id = this.commentData.parent_id ? this.commentData.parent_id : this.commentData._id;
                    data.to_user = this.commentData.user._id;
                }
                data.content = this.content;
                this.content = '';
                this.$emit('submitData', data);
            },
            checkLogin() {
                if (!this.GLOBALDATA.isLogin) {
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
            cancel() {
                this.content = '';
                this.$emit('cancel', this.index)
            },
            setPlaceholder() {
                if (this.commentData) {
                    if (this.commentData.parent_id) {
                        this.placeholder = '@' + this.commentData.user.name;
                    } else {
                        this.placeholder = '写下你的评论...';
                    }
                }
            }
        }
    }

</script>

<style lang="scss">
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
</style>
