const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')
const fake = require('./fake')
const app = require('../app')

module.exports = function () {
	request({
		url: 'https://cn.bing.com/images/search?q=%E6%98%8E%E6%98%9F&FORM=HDRSC2',
		method: 'get'
	}, function (error, response, body) {
		//console.log(body)
		let $ = cheerio.load(body)

		console.log($('img').length)
		setTimeout(function () {
			$('img').toArray()
				.map(item => $(item).attr('src'))
				.filter(item => item.indexOf('http') === 0)
				.reduce(function (pre, cur, index) {
					return pre.then(function () {
						console.log(new Date())
						/*if (index > 4) {
							return new Promise(function (relove) {
								setTimeout(function () {
									relove('success')
								}, 2000)
							})
						}*/
						const order = fake.generateFakeOrder({}, new Date('2016-10-' + Math.ceil(Math.random() * 30) + ' ' + Math.ceil(Math.random() * 23) + ':' + Math.ceil(Math.random() * 59)).getTime())
						app.context.cache[order.orderNumber] = order

						process.socket.emit('fakeOrder', {
							orderId: order.orderNumber,
							url: cur
						})
						return new Promise(function (relove) {
							setTimeout(function () {
								relove('success')
							}, 6000)
						})
					})

				}, Promise.resolve())
		}, 5000)
	})
}