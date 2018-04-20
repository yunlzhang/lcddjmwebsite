
module.exports = function (app) {
        
    app.use('/api/signup', require('./signup'));
    app.use('/api/signin', require('./signin'));
    app.use('/api/signout',require('./signout'));    
    app.use('/api/gettoken',require('./gettoken'));
    app.use('/api/get_user_info',require('./getuserinfo'));
    app.use('/api/article',require('./article'));
    app.use('/api/upload',require('./upload'));
    app.use('/api/comment',require('./comment'));
};
