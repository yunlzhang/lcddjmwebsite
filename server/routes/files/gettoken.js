var express = require('express');
var router = express.Router();
var qiniu  = require('qiniu');
var config = require('../../config');
var accessKey = config.qiniu.accessKey;
var secretKey = config.qiniu.secretKey;

var options = {
    scope: 'pict',
};
var putPolicy = new qiniu.rs.PutPolicy(options);

router.get('/',function(req,res,next){
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var uploadToken=putPolicy.uploadToken(mac);
    res.json({
        code:200,
        uptoken:uploadToken
    })
})
module.exports = router;
