const personGroup = require('./person-group')
const person = require('./person')
/*personGroup.get('group').then(function (data) {
	console.log(data)
})*/
person.create('group', 'test').then(function (data) {
	console.log(data)
})