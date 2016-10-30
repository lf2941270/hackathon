'use strict';
const qiniu = require("qiniu");
const util = require('util');
const uuid = require('uuid');
const _ = require('lodash')
const apiRouter = require('koa-router')({
	prefix: '/api'
});

const app = require('../app');
const face = require('../face');
const fake = require('../fake/fake')
var session = require('koa-session');
app.keys = ['some secret hurr'];

var CONFIG = {
	key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
	maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
	overwrite: true, /** (boolean) can overwrite or not (default true) */
	httpOnly: true, /** (boolean) httpOnly or not (default true) */
	signed: true, /** (boolean) signed or not (default true) */
};
app.use(session(CONFIG, app));
app.context.cache = {};
apiRouter.get('/upload_token', function * () {

	//需要填写你的 Access Key 和 Secret Key
	qiniu.conf.ACCESS_KEY = '35bMF5rT5-q3PYhVvJ793vaTwq5d8BU2EShyLkGC';
	qiniu.conf.SECRET_KEY = '8A1haHkt71OY4VikO4X4zhtpx_N7gJkuTGnEW-KD';

	//要上传的空间
	var bucket = 'afan';

	//上传到七牛后保存的文件名
	var key = new Date().getTime() + '_' + Math.round(Math.random() * 1000) + '.jpg';

	function uptoken(bucket, key) {
		var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
		return putPolicy.token();
	}

	//生成上传 Token
	var token = uptoken(bucket, key);

	this.body = {
		token: token,
		key: key
	};
})


apiRouter.post('/order', function *() {
	var order = this.request.body;
	order = fake.generateFakeOrder(order)
	console.log(order)
	this.app.context.cache[order.orderNumber] = order;
	process.socket.emit('order', order)
	this.set({'Access-Control-Allow-Origin': '*'});
	this.body = 'success'
})
apiRouter.get('/order', function *() {
	this.body = new Date().getTime()
})
apiRouter.post('/pic', function *() {
	console.log('process image : ', this.request.body.url, 'orderId : ', this.request.body.orderId)
	yield face.process(this.request.body.url, this.request.body.orderId)
	this.body = 'success'
})

apiRouter.post('/login', function *() {
	if(this.request.body.user === 'admin' && this.request.body.password === 'admin') {
		this.session.login = true;
		this.body = {status: 'success'}
	} else {
		this.body = {error: '账号或密码不正确'}
	}
})
module.exports = apiRouter;