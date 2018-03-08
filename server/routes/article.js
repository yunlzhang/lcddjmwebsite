var express = require('express');
var router = express.Router();
var ArticleModel = require('../models/article');


router.post('/deal_article',function(req,res,next){
    if(!req.session.user){
        return res.json({
            code:100,
            message:'未登陆'
        })
    }   
    var author = req.session.user._id,  
        title = req.body.title,
        cover = req.body.cover,
        content = req.body.content,
        id = req.body.id,
        tags = req.body.tags || '';
    if(!content){
        return res.json({
            code:100,
            message:'文章内容不能为空'
        })
    };

    var article = {
        author:author,
        title:title,
        cover:cover,
        content:content,
        tags:tags
    }
    if(id){
        ArticleModel.updateArticle(id,article)
        .then(function(result){
            res.json({
                code:200,
                message:'文章更新成功'
            })
        })
        .catch(next);
    }else{
        ArticleModel.create(article)
        .then(function (result) {
            res.json({
                code:200,
                message:'文章发表成功'
            })
        })
        .catch(next);
    }
})

router.get('/get_article_length',function(req,res){
    ArticleModel.getLength()
    .then(function (result) {
        res.json({
            code:200,
            article_length:result.length,
            message:'success'
        });
    }).catch(e =>{
        res.json({
            code:100,
            message:'fail'
        });
    })
});

router.get('/get_article',function(req,res){
    var opts = req.query;
    ArticleModel.getPosts(opts)
    .then(function (result) {
        result.forEach(function(item,index){
            //截取部分内容
            var tempStr = item.content.replace(/<[^>]*>/ig,'').replace(/\&nbsp;/g,'');
            result[index]['des'] = tempStr.slice(0,200) + '...';
            delete result[index]['content'];
        })
        res.json({
            code:200,
            data:result,
            message:'获取列表成功'
        });
    }).catch(e =>{
        res.json({
            code:100,
            message:'获取失败'
        });
    })
});
router.get('/get_article_detail',function(req,res){
    var opts = req.query;
    ArticleModel.getPostById(opts._id)
    .then(function (result) {
        res.json({
            code:200,
            data:result,
            message:'获取文章信息成功'
        });
    }).catch(e =>{
        res.json({
            code:100,
            message:'获取失败'
        });
    })
});

router.post('/update_article_detail',function(){
    var change
    var id = req.body.id;

})



module.exports = router;