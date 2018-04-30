module.exports = function(req,res,next){
    if(!req.session.user){
        return res.json({
            code:100,
            message:'未登陆或登陆已过期'
        })
    }
}