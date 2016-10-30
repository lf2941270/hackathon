var path = require('path');
var views = require('co-views');
var koa = require('koa');
var app = module.exports = koa();
var bodyparser = require('koa-bodyparser')();
var fs = require('fs');
const https = require('https');
var server = https.createServer({
	key: fs.readFileSync('./afan_nopass.key'),
	cert: fs.readFileSync('./afan.crt'),
	//ca: fs.readFileSync('./test_ca.crt'),
	requestCert: false,
	rejectUnauthorized: false
}, app.callback());
require('./socketio')(server)
// setup views, appending .ejs
// when no extname is given to render()

app.use(bodyparser);
app.use(require('./routes/api').routes());
app.use(require('./routes/frontend').routes());
app.use(require('koa-static')('./client/assets'));
app.use(require('koa-static')('./dist'));
if (require.main === module) {
	server.listen(3000, function() {
		console.log('Listening on port', 3000);
	});
} else {
	module.exports = server;
}