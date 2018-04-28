let express = require('express');
let router = express.Router();
let qiniu  = require('qiniu');
let config = require('../../config');
let accessKey = config.qiniu.accessKey;
let secretKey = config.qiniu.secretKey;

let options = {
    scope: 'pict',
};
let putPolicy = new qiniu.rs.PutPolicy(options);

router.get('/',function(req,res,next){
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let uploadToken=putPolicy.uploadToken(mac);
    res.json({
        code:200,
        uptoken:uploadToken
    })
})
module.exports = router;
