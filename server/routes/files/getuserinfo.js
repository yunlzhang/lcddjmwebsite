let sha1 = require('sha1');
let express = require('express');
let router = express.Router();
let UserModel = require('../../models/users');
const checkLogin = require('../common/check-login');


router.get('/',checkLogin,function(req, res, next) {
    delete req.session.user.password;
    return res.json({
        code:200,
        data:req.session.user,
        message:''
    })
});

module.exports = router;

