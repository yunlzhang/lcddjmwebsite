var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');


router.post('/',function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
  
    UserModel.getUserByName(name)
      .then(function (user) {
        if (!user) {
            return res.json({
                'code':100,
                'message':'用户不存在'
            })
        }
        // 检查密码是否匹配
        if (sha1(password) !== user.password) {
            return res.json({
                'code':100,
                'message':'密码不正确'
            })
        }
        delete user.password;
         // 用户信息写入 session
         req.session.user = user;        
        return res.json({
            'code':200,
            'message':'登陆成功',
            'data':user
        })
       
      })
      .catch(next);
  });
  
  module.exports = router;

