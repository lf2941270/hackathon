
'use strict';
// 3rd party
const router = require('koa-router')();
const views = require('co-views');
const path = require('path');
const render = views(path.join(__dirname, '../views'), {
	map: {
		html: 'ejs'
	}
});

module.exports = router;