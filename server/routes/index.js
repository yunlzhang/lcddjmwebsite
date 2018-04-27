

function getPath(file){
    return require('./files/' + file);
}
module.exports = function (app) {
        
    app.use('/api/signup', getPath('signup'));
    app.use('/api/signin', getPath('signin'));
    app.use('/api/signout',getPath('signout'));    
    app.use('/api/gettoken',getPath('gettoken'));
    app.use('/api/get_user_info',getPath('getuserinfo'));
    app.use('/api/article',getPath('article'));
    app.use('/api/upload',getPath('upload'));
    app.use('/api/comment',getPath('./comment'));
};
