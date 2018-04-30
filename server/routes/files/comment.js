const express = require('express');
const router = express.Router();
const commentModal = require('../../models/comment');
const articleModal = require('../../models/article');
const checkLogin = require('../common/check-login');

router.get('/get_more_comments',function(req,res,next){
    let opts = req.query;

    if(!req.query.article_id){
        return res.json({
            code:100,
            message:'文章id不能为空'
        })
    }
    commentModal.getComment(opts)
    .then(result => {
        res.json({
            code:200,
            comments:result,
            message:'获取成功'
        })
    }).catch(err => {
        res.json({
            code:100,
            info:JSON.stringify(err),
            message:'获取失败'
        })
    })
})
router.get('/get_more_sub_comments',function(req,res,next){
    let opts = req.query;
    if(!req.query.article_id){
        return res.json({
            code:100,
            message:'文章id不能为空'
        })
    }
    if(!req.query.parent_id){
        return res.json({
            code:100,
            message:'一级评论id不能为空'
        })
    }

    commentModal.getSubComment(opts)
    .then(result => {
        res.json({
            code:200,
            sub_comments:result,
            message:'获取成功'
        })
    }).catch(err => {
        res.json({
            code:100,
            info:JSON.stringify(err),
            message:'获取失败'
        })
    })
})


router.post('/',checkLogin,function(req,res,next){
    
    let comment = {};
    comment.user = req.session.user._id;
    comment.to_user = req.body.to_user;
    comment.parent_id = req.body.parent_id;
    comment.content = req.body.content;
    comment.article_id = req.body.article_id;
    if(!comment.content){
        return res.json({
            code:100,
            message:'文章内容不能为空'
        })
    };

    commentModal.create(comment)
    .then(function (result) {
        if(!comment.parent_id){
            //一级评论
            articleModal.updateComment(comment.article_id,result._id)
            .then( data => {
                res.json({
                    code:200,
                    data:result,
                    message:'评论成功'
                })
            })
        }else{
            //二级评论
            commentModal.updateComment(result.parent_id,result._id)
            .then( data => {
                res.json({
                    code:200,
                    data:result,
                    message:'评论成功'
                })
            })
        }
        
    })
    .catch(next);
})
module.exports = router;