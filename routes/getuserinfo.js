var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');


router.get('/',function(req, res, next) {
    console.log(req.session.user);
    if(req.session.user){
        return res.json({
            code:200,
            data:req.session.user,
            message:''
        })
    }else{
        return res.json({
            code:100,
            data:'',
            message:'登陆过期或未登陆'
        })
    }
  });
  
  module.exports = router;

