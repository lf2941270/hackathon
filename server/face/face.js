const conf = require('../conf')
var request = require('./request')
var _ = require('lodash')
module.exports = {
	detect: function () {
		return request.post('/detec', url)
	},
	identify: function (options) {
		_.extend({
			"personGroupId":"group",
			"faceIds":[],
			"maxNumOfCandidatesReturned":1,
			"confidenceThreshold": 0.5
		}, options)
		return request.post('/identify', options)
	}

}