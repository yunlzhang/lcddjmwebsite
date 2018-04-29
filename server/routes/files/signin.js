let sha1 = require('sha1');
let express = require('express');
let router = express.Router();
let UserModel = require('../../models/users');


router.post('/',function(req, res, next) {
    let name = req.body.name;
    let password = req.body.password;
  
    UserModel.getUserByName(name)
    .then(function (user) {
        if (!user) {
            return res.json({
                'code':100,
                'message':'用户不存在'
            })
        }
        console.log(user.password);
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

