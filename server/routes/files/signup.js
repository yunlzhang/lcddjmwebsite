let express = require('express');
let router = express.Router();
let sha1 = require('sha1');
let UserModel = require('../../models/users');

router.post('/',function(req,res,next){
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;

    let name = req.body.name,
        password = req.body.password,
        repassword = req.body.repassword,
        avatar = req.body.avatar,
        intro = req.body.intro;
    //校验
    if(!name){
        return res.json({
            code:'100',
            message:'昵称不能为空'
        });
    }
    if(!reg.test(password)){
        return res.json({
            code:'100',
            message:'密码应该包含字母和数字，6-10位'
        });
    }
    if(repassword !== password){
        return res.json({
            code:'100',
            message:'两次输入的密码不一致'
        });
    }
    if(intro.length < 1 || intro.length >100){
        return res.json({
            code:'100',
            message:'简介长度应该在0-100之间'
        });
    }
    password = sha1(password);
    let signupData = {
        name:name,
        password:password,
        intro:intro,
        avatar:avatar
    };
    if(!avatar){
        delete signupData.avatar;
    }
    UserModel.create(signupData)
    .then(function (result) {
    //   // 此 user 是插入 mongodb 后的值，包含 _id
    //   user = result.ops[0];
    //   // 将用户信息存入 session
    //   delete user.password;
    //   req.session.user = user;
      res.json({
          code:200,
          message:'注册成功'
      })
    })
    .catch(function (e) {
        // 用户名被占用
        if (e.message.match('E11000 duplicate key')) {
            return res.json({
                code:100,
                message:'用户名已被占用'
            });
        }
        next(e);
    });

});
module.exports = router;
