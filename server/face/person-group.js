const conf = require('../conf');
var request = require('./request')
module.exports = {
	create: function () {
		return request.put('/persongroups/group', {
			"name":"group",
			"userData":"user-provided data attached to the person group"
		})
	},
	delete: function () {
		return request.delete('/persongroups/group')
	},
	getAll: function () {
		return request.get('/persongroups')
	},
	get: function (personGroupId) {
		return request.get('/persongroups/' + personGroupId)
	},
	train: function (personGroupId) {
		return request.post('/persongroups/' + personGroupId + '/train')
	},
	getTrainStatus: function (personGroupId) {
		return request.get('/persongroups/' + personGroupId + '/training')
	}
}