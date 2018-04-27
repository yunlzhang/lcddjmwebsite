const express = require('express');
const router = express.Router();
const CommentModal = require('../../models/comment');
router.get('/',function(req,res,next){
    console.log(req);

})


router.post('/',function(req,res,next){
    if(!req.session.user){
        return res.json({
            code:100,
            message:'未登陆'
        })
    }
    let comment = {};
    comment.user_id = req.session.user._id;
    comment.content = req.body.content;
    comment.parent_id = req.body.parent_id || '';
    comment.content = req.body.content;
    comment.article_id = req.body.article_id;
    if(!comment.content){
        return res.json({
            code:100,
            message:'文章内容不能为空'
        })
    };

    CommentModal.create(comment)
    .then(function (result) {
        res.json({
            code:200,
            data:result,
            message:'评论成功'
        })
    })
    .catch(next);
})
module.exports = router;