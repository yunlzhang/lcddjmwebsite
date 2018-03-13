const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const renderer = createBundleRenderer(resolve('dist/vue-ssr-server-bundle.json'), {
  template:require('fs').readFileSync(resolve('index.template.html'), 'utf-8')
});
const WindowMock = require('window-mock').default;

let window = new WindowMock();
global.window = window;
global.localStorage = window.localStorage;
global.document = window.document;

function resolve(dir) {
	return path.join(__dirname, '../..', dir)
}

module.exports = function (app) {
    app.get('/', function (req, res) {
        const s = Date.now()

        res.setHeader("Content-Type", "text/html")
        renderer.renderToStream()
        .on('error', errorHandler)
        .on('end', () => console.log(`whole request: ${Date.now() - s}ms`))
        .pipe(res)
        const errorHandler = err => {
            console.log(err);
            if (err && err.code === 404) {
              res.status(404).end('404 | Page Not Found')
            } else {
              // Render Error Page or Redirect
              res.status(500).end('500 | Internal Server Error')
              console.error(`error during render : ${req.url}`)
              console.error(err)
            }
        }
    });
    
    app.use('/api/signup', require('./signup'));
    app.use('/api/signin', require('./signin'));
    app.use('/api/signout',require('./signout'));    
    app.use('/api/gettoken',require('./gettoken'));
    app.use('/api/get_user_info',require('./getuserinfo'));
    app.use('/api/article',require('./article'));
};
