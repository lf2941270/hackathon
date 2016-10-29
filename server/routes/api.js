'use strict';
// 3rd party
const apiRouter = require('koa-router')({
	prefix: '/api'
});
const qiniu = require("qiniu");

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
module.exports = apiRouter;