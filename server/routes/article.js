var express = require('express');
var router = express.Router();
var ArticleModel = require('../models/article');


router.post('/save_article',function(req,res,next){
    var author = req.session.user._id;
    var title = req.body.title;
    var cover = req.body.cover;
    var content = req.fields.content;


    if(!author){
        return res.json({
            code:100,
            message:'未登陆'
        })
    }
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
        content:content
    }

    ArticleModel.create(article)
    .then(function (result) {
        console.log(result);
        res.json({
            code:200,
            message:'文章发表成功'
        })

    })
    .catch(next);
})

router.get('/:postId',function(req,res){


})


module.exports = router;