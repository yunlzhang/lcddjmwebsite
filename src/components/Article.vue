<template>
    <div class="article-wrap">
        <div class="title">{{articleData.title}}</div>
        <div class="cover" v-if="articleData.cover"><img :src="articleData.cover" alt=""></div>
        <div class="content">
            <div v-html="articleData.content"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Article',
    data() {
        return {
            articleData:{}
        }
    },
    mounted: function () {
        // document.title = 'lcddjm\'s website';
        this.getArticleDetail();
    },
    methods:{
        getArticleDetail(){
            this.$http.get('/api/article/get_article_detail',{
                params:{
                    _id:this.$route.params.id
                }
            }).then(res => {
                if(res.body.code == 200){
                    this.articleData = res.body.data;
                    document.title = res.body.data.title;    
                }
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
        .title{
            font-size:30px;
            margin:20px 0;
            font-weight:700;
            line-height:1.75;
        }
        .cover{
            margin:20px 0;
        }
    }
</style>
