const conf = require('../conf');
var request = require('./request')
module.exports = {
	create: function (personGroupId, personName) {
		return request.post('/persongroups/' + personGroupId + '/persons', {
			"name":personName,
		})
	},
	addFace: function (options) {
		//personGroupId, personId, targetFace, faceUrl
		return request.post('/persongroups/' + options.personGroupId + '/persons/' + options.personId + '/persistedFaces?targetFace=' + options.targetFace, {
			'url': options.faceUrl
		})
	},

}