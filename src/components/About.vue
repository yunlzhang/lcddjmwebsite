<template>
    <div class="about-wrap main">
        <div>本网站属个人所有，不涉及商业目的。遵守中华人民共和国法律法规、中华民族基本道德和基本网络道德规范，尊重有节制的言论自由和意识形态自由，反对激进、破坏、低俗、广告、投机等不负责任的言行。所有转载的文撰写页面章、图片仅用于说明性目的，被要求或认为适当时，将标注署名与来源。避免转载有明确“不予转载”声明的作品。若不愿某一作品被转用，请及时通知本人。对于无版权或自由版权作品，本网站有权进行修改和传播，一旦涉及实质性修改，本网站将对修改后的作品享有相当的版权。二次转载者请再次确认原作者所给予的权力范围。 本网站所有原创作品，包括文字、资料、图片、网页格式，转载时请标注作者与来源。非经允许，不得用于赢利目的。本网站受中国知识产权、互联网法规和知识共享条例保护和保障，任何人不得进行旨在破坏或牟取私利的行为。</div>
        <div>如无特别说明，本站所有原创文章采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_blank">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a>进行许可。</div>
    </div>
</template>

<script>

export default {
    name: 'About',
    data() {
        return {}
    },
    mounted: function () {
        document.title = '关于';
    },
    methods:{
        
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .about-wrap{
        padding-top:80px;
        overflow:hidden;
        transition:padding 1s linear;
        width:800px;
        margin:0 auto;
        a{
            color:red;
        }
    }
</style>
