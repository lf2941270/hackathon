const uuid = require('uuid')
const _ = require('lodash')
require('./fakeData')()
exports.generateFakeOrder = function (order, createTime) {
	order = order || {}
	order.orderNumber = order.orderNumber || uuid.v4();
	order.createTime = createTime || new Date().getTime()
	const goods = [
		{
			id: 'G01',
			name: '土豆烧茄子',
			price: 14
		},
		{
			id: 'G02',
			name: '酸菜鱼',
			price: 16
		},
		{
			id: 'G03',
			name: '香菇滑鸡',
			price: 15
		},
		{
			id: 'G04',
			name: '武昌鱼',
			price: 21
		},
		{
			id: 'G05',
			name: '蒸蛋',
			price: 3
		},
		{
			id: 'G06',
			name: '米饭',
			price: 1
		}
	]
	order.detail = new Array(Math.ceil(Math.random() * 5 + 1)).join('0').split('').map(function() {
		return _.extend({count: Math.ceil(Math.random() * 4)}, goods[Math.floor(Math.random() * 6)])
	})
	order.totalPrice = _.reduce(order.detail, function (pre, cur) {
		return pre + cur.price * cur.count
	}, 0)
	return order
}