<template>
	<div class="main">
        <div class="my-resume">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item v-for="(item,index) in myData" :key="index" :title="item.title" :name="index+1">
                    <div v-for="(sitem,sindex) in item.details" :key="sindex">
                        <div v-if="typeof sitem === 'string'">{{sitem}}</div>
                        <div v-else :class="'project-item' + (sindex == 0 ? ' no-margin-top' : '')" >
                            <h4 v-html="sitem.title"></h4>
                            <div v-for="(gsitem,gsindex) in sitem.details" :key="gsindex">{{gsitem}}</div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
	</div>
</template>
<script>
	export default {
		name: 'Life',
		data() {
			return {
                activeNames:[1,2,3],
                myData:[
                    {
                        title:'概况',
                        details:[
                            '毕业至今已有两年多前端开发经验，熟悉前端主流的技术框架，能快速入手项目的开发工作。对前端前沿技术有较强的好奇心，时刻关注前端技术的发展，有很强的自学能力。秉承天道酬勤的人生态度，不断提升自己的能力。'
                        ]
                    },
                    {
                        title:'教育',
                        details:[
                            '烟台大学 - 本科（四年） 电子信息工程'
                        ]
                    },
                    {
                        title:'技能',
                        details:[
                            '•	精通使用html/css,在w3c的标准下合理高效的使用html5、css3。',
                            '•	精通原生javascript（原型链，闭包，跨域，ajax，BOM及DOM对象等）的使用，了解ES6的规范，并应用在实际的项目中 。',
                            '•	熟练掌握前端模块化，了解AMD、CMD、UMD规范。',
                            '•	熟练使用MVVM框架VUE,了解react,angular框架。',
                            '•	熟练使用sass,less等预编译语言',
                            '•	熟练使用前端构建工具gulp,webpack等',
                            '•	熟练使用git,svn等版本管理工具',
                            '•	熟练使用node、基于node的express框架,了解koa',
                            '•	熟悉PHP、java等后端语言',
                            '•	了解mongodb,mysql等数据库的使用',
                            '•	了解linux系统，nginx的使用，亲手部署过项目。',
                            '•	了解http协议，对网络安全有一定的认知，了解XSS和CSRF等网络攻击的防御手段'
                        ]
                    },
                    {
                        title:'工作经历',
                        details:[
                            '摩点会想科技有限公司    2016-08 – 至今  前端开发工程师（小组长）',
                            '主要职责：1、老项目维护更新 2、新项目的开展实施 3、前端规范的制定及项目技术选型'
                        ]
                    },
                    {
                        title:'项目经验',
                        details:[
                                {
                                    title:'1、摩点官网 (<a href="//www.modian.com/" target="_blank">https://www.modian.com/</a>)',
                                    details:[
                                        '项目职责：开发',
                                        '项目技术栈：require.js + jquery  + echarts.js + gulp',
                                        '项目模块：首页、项目列表、项目编辑发起、cp管理、个人中心等。',
                                        '项目亮点：1、公共模块（评论，列表等）单独编写，统一引入，公共逻辑代码抽离，通过require.js模块化加载。2、通过gulp合并压缩js,css 3、通过r.js打包require.js相关代码，减少网络请求。4、小图标统一使用iconfont，提升体验'
                                    ]
                                },
                                {
                                    title:'2、摩点网m站 (<a href="//m.modian.com/project/14501.html" target="_blank">https://m.modian.com/project/14501.html/</a>)移动端打开',
                                    details:[
                                        '项目职责：开发',
                                        '技术栈： rem + jquery + gulp',
                                        '项目模块：微博内嵌页面、m端项目详情页、更新、下单、支付等',
                                        '项目亮点：1、通过rem布局适配不同分辨率手机 2、小图标统一使用svg,减少网络请求，优化体验。3、通过gulp压缩合并js,css，减少网络请求'
                                    ]
                                },
                                {
                                    title:'3、微打赏 (<a href="//wds.modian.com／" target="_blank">https://wds.modian.com</a>)',
                                    details:[
                                        '项目职责：开发',
                                        '技术栈：原生JS + gulp',
                                        '项目模块：首页、项目列表、项目编辑发起、cp管理、个人中心等。',
                                        '项目亮点：1、整理老旧代码，剔除老页面中多余代码，优化代码结构。2、pc、m共用一套代码，pc做相应限制满足产品要求。'
                                    ]
                                }
                                ,{
                                    title:'4、摩点微打赏 (小程序)',
                                    details:[
                                        '项目职责：开发',
                                        '项目技术栈：wxml+wxss+es6+wxParse',
                                        '项目模块：列表、下单、个人中心、发起项目等',
                                        '项目亮点：1、使用es6开发，引入Promise,优雅解决回调过多问题 2、采用wxParse,使用html2json将html字符串解析成对象，配合小程序中的template模板完美还原文章'
                                    ]
                                }
                                ,{
                                    title:'5、lcddjm(<a href="//www.lcddjm.com/">https://www.lcddjm.com/</a>)',
                                    details:[
                                        '技术栈：vue2 + axios + express + mongodb + pm2 + nginx',
                                        '项目模块：列表、详情、文章编辑、登录、注册、评论等',
                                        '项目亮点：全栈开发，后端express,前端vue,存储使用mongoDB,通过pm2部署在阿里云，nginx做代理转发,图片采用七牛cdn，提升速度，仿照简书写了一套评论组件。'
                                    ]
                                }
                                
                            
                        ]
                    }
                ]
            }
		},
		mounted: function () {
			document.title = '关于我';
		},
		methods: {
            handleChange(val){
                console.log(val);
            }
		}
	}

</script>

<style scope lang="scss">
    .my-resume{
        font-size:16px;
        line-height:1.75;
        width:800px;
        padding:0 40px;
        margin:0 auto;
        a{
            color:#0db4f9;
        }
        .el-collapse-item__header{
            font-size:18px;
            font-weight: normal;
        }
        .el-collapse-item__header, .el-collapse-item__wrap{
            background: none!important;
        }
        .project-item{
            h4{
                line-height:40px;
            }
            margin:20px 0;
        }
        .no-margin-top{
            margin-top:0;
        }
    }

</style>
