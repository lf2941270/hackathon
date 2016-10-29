'use strict';
// 3rd party
const router = require('koa-router')();
const views = require('co-views');
const path = require('path');
const render = views(path.join(__dirname, '../../views'), {
	map: {
		html: 'ejs'
	}
});

router.get('/test', function * () {
	this.assert(config.NODE_ENV === 'development', 404);
	this.body = this.headers['user-agent'];
});

router.get('/', function * () {
	this.redirect('/camera')
});

router.get('/camera', function * () {
	this.body = yield render('camera', {});
});

router.get('/order', function * () {
	this.body = yield render('order', {});
});

module.exports = router;