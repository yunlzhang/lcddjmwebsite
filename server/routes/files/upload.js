let express = require('express');
let router = express.Router();
let multer  = require('multer')
let fs = require('fs');
let uuidV1 = require('uuid/v1');
 
let upload = multer({ dest: './qnimg/' }).single('pic');
router.post('/',function(req,res,next){
    if (!req.session.user && !req.headers.referer.match(/signup/)) {
        return res.json({
            code:'100',
            message:'未登录或登录已过期'
        })
        // An error occurred when uploading
    }
    upload(req, res, function (err) {
        if (err) {
            res.json({
                code:'100',
                message:'上传出错'
            })
            // An error occurred when uploading
            return;
        }
        if(!req.file){
            res.json({
                code:'100',
                message:'上传出错'
            })
            // An error occurred when uploading
            return;
        }
        // Everything went fine 
        let path = './qnimg/' + (req.body.path ? req.body.path + '/' :'') ;
        //创建文件夹
        if(fs.existsSync(path)){
            rename()
        }else{
            fs.mkdir(path,err => {
                if(err){
                    res.json({
                        code:'100',
                        message:'服务器创建文件夹失败'
                    })
                    return;
                }
                rename()
            })
        }
       
        function rename(){
            let  fileFormat = req.file.mimetype.split("/");
            let newName = uuidV1() + "." + fileFormat[1];
            fs.rename('./qnimg/' + req.file.filename , path + newName,err => {
                if(err){
                    res.json({
                        code:'100',
                        message:'文件重命名失败'
                    })
                    return;
                }
                // fs.unlink('./qnimg/' + req.file.filename,err => {
                //     console.log(err);
                // });
                res.json({
                    code:200,
                    message:'上传成功',
                    img:`/${req.body.path}/${newName}`
                });
            })
        }
        
    })
});

module.exports = router;