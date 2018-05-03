const express = require('express');
const router = express.Router();
const ArticleModel = require('../../models/article');
const arrayCurry  =  require('../../common/public').arrayCurry;
const Promise = require("bluebird");
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

router.get('/',function(req,res){
    if(!req.query.key){
        return res.json({
            code:100,
            message:"搜索条件不能为空"
        })
    }
    let searchParams = {
        page:req.query.page || 0,
        num:req.query.page || 5,
        key:req.query.key
    }
    ArticleModel.searchArticle(searchParams).then(result =>{
        result.forEach((item,index) => {
            result[index]['created_at'] = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')            
        })
        res.json({
            code:200,
            data:result,
            message:'success'
        });
    }).catch(err => {
        console.log(err);
        res.json({
            code:'100',
            message:'查询出错'
        })
    })

})

module.exports = router;