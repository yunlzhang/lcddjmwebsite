<template>
	<div>
		<div class="signup-wrap">
			<div class="signup">
				<div class="avatar">
					<svg v-if="!signupData.avatar" class="icon" aria-hidden="true">
						<use xlink:href="#icon-xiugaigerentouxiang-"></use>
					</svg>
					<img v-else :src="signupData.avatar" alt="">
					<input type="file" @change="cropAvatar" title="上传喜欢的头像">
				</div>
				<div class="username">
					<div class="l">昵称</div>
					<div class="r">
						<input type="text" v-model="signupData.name" placeholder="请输入昵称" name="nickname">
					</div>
				</div>
				<div class="username">
					<div class="l">密码</div>
					<div class="r">
						<input type="password" v-model="signupData.password" name="password" placeholder="请输入密码，6-10位">
					</div>
				</div>
				<div class="username">
					<div class="l">确认密码</div>
					<div class="r">
						<input type="password" v-model="signupData.repassword" name="password" placeholder="请再次输入密码">
					</div>
				</div>
				<div class="intro">
					<div class="l">简介</div>
					<div class="r">
						<textarea name="intro" v-model="signupData.intro" max-length="100" placeholder="简单介绍一下～不要超过100字哦"></textarea>
					</div>
				</div>
				<div class="confirm" @click="signup">注册</div>
			</div>
		</div>
		<Rain></Rain>
        <div class="cropper-wrap" v-if="cropper">
            <vueCropper
            ref="cropper"
            :autoCrop="true"
            :img="options.img"
            :fixed="true" 
            :outputSize="1"
            :outputType="'png'"
            :autoCropWidth=200
            :autoCropHeight=200
            ></vueCropper>
            <div class="buttons">
                <span class="confirm" @click="confirmCrop">确定</span>
                <span @click="cancelCrop">取消</span>
            </div>
        </div>
	</div>
</template>

<script>
    import Rain from './Rainday';
    import VueCropper from 'vue-cropper'
	import {
		instantiationEngine
	} from '../static/js/rain_engine'
	export default {
		name: 'Signup',
		data() {
			return {
				signupData: {
					name: '',
					password: '',
					repassword: '',
					intro: '',
					avatar: ''
                },
                options:{//裁剪参数
                    img:'',
                },
                cropper:false
			}
		},
		mounted: function () {
			document.title = '注册';
			this.$nextTick(function () {
				instantiationEngine();
			})
        },
        methods: {
            cropAvatar(e){
                let file = e.target.files[0];
                let fileReader = new FileReader();
                fileReader.onload = e => {
                    console.log(this);
                    this.options.img = e.target.result;
                    this.cropper = true;
                }
                fileReader.readAsDataURL(file);
            },
			signup() {
				this.axios({
						method: 'post',
						data: this.signupData,
						url: '/api/signup'
					})
					.then(res => {
						if (res.data.code === 200) {
							this.$router.push('/signin');
						} else {
							this.$message({
								message: res.data.message,
								type: 'info'
							});
						}
					})
            },
            confirmCrop(){
                this.$refs.cropper.getCropBlob((data) => {
                    let formData = new FormData();
                    formData.append('pic',data);
                    formData.append('path','avatar');
                    this.upImg(formData)
                    .then(res => {
                        this.signupData.avatar = this.GLOBALDATA.imgOrigin + res.data.img;
                    })
                    this.cropper = false;
                });
                this.resetFileValue();                
            },
            cancelCrop(){
                this.cropper = false;
                this.resetFileValue();
            },
            resetFileValue(){
                document.querySelector('.avatar input[type="file"]').value = '';
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
            Rain,
            VueCropper
		},

	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.signup-wrap {
		width: 100%;
		height: 100%;
	}

	.signup {
		width: 500px;
		background: rgba(255, 255, 255, .4);
		padding: 40px 50px;
		border: 1px solid #dee0e1;
		border-radius: 6px;
		font-size: 16px;
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 1;
		transform: translate(-50%, -50%);
		>div {
			display: flex;
			height: 40px;
			line-height: 40px;
			margin: 15px 0;
			border: 1px solid #dee0e1;
			overflow: hidden;
		}
		input,
		textarea {
			display: block;
			outline: none;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			border: none;
			font-size: 16px;
			line-height: 40px;
			resize: none;
			background: none;
		}
		.intro {
			height: 120px;
		}
		.l {
			width: 100px;
			text-indent: 20px;
			text-align: left;
		}
		.r {
			flex: 1;
		}
		.avatar {
			margin: 0 auto 20px;
			width: 60px;
			height: 60px;
			border-radius: 50%;
			position: relative;
			overflow: hidden;
			.icon {
				font-size: 60px;
				text-align: center;
				line-height: 60px;
			}
			input {
				position: absolute;
				opacity: 0;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				cursor: pointer;
			}
		}
		.confirm {
			height: 40px;
			text-align: center;
			line-height: 40px;
			margin-bottom: 0;
			background: #0db4f9;
			justify-content: center;
			cursor: pointer;
			color: #fff;
		}
	}

    .cropper-wrap{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 100;
        .buttons{
            position: absolute;
            top:0;
            right:0;
            span{
                float:left;
                width: 60px;
                height:40px;
                margin:20px;
                text-align: center;
                line-height:40px;
                border:1px solid #dee0e1;
                background:#fff;
                border-radius:3px;
                cursor: pointer;
            }
            .confirm{
                background: #0db4f9;
                color:#fff;
            }
        }
    }
</style>
