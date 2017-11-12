module.exports = function (app) {
    // app.get('/', function (req, res) {
    //     res.sendFile('index.html')
    // });
    app.use('/api/signup', require('./signup'));
    app.use('/api/gettoken',require('./gettoken'));
};
