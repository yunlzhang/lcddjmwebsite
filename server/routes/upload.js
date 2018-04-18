var express = require('express');
var router = express.Router();
var multer  = require('multer')
var fs = require('fs');
var uuidV1 = require('uuid/v1');

var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './qnimg');    // 保存的路径，备注：需要自己创建
    }, 
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, uuidV1() + "." + fileFormat[fileFormat.length - 1]);
     }
});  
var upload = multer({storage: storage}).single('file');
router.post('/',function(req,res,next){
    upload(req, res, function (err) {
        if (err) {
            res.json({
                code:'100',
                message:'上传出错'
            })
            // An error occurred when uploading
            return;
        }
        // Everything went fine        
        res.json({
            code:200,
            message:'上传成功',
            data:{
                img:'https://image.lcddjm.com/'+req.file.path
            }
        });
    })
});

module.exports = router;