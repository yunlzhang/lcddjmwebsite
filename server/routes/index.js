module.exports = function (app) {
    // app.get('/', function (req, res) {
    //     // renderer.renderToString(app, (err, html) => {
    //     //     console.log(html) // will be the full page with app content injected.
    //     // })
    //     res.sendFile('index.html')
    // });
    
    app.use('/api/signup', require('./signup'));
    app.use('/api/signin', require('./signin'));
    app.use('/api/signout',require('./signout'));    
    app.use('/api/gettoken',require('./gettoken'));
    app.use('/api/get_user_info',require('./getuserinfo'));
    app.use('/api/article',require('./article'));
};
