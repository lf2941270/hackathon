const conf = require('../conf')
var request = require('./request')
var _ = require('lodash')
module.exports = {
	detect: function (url) {
		return request.post('/detect?returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses', {url: url})
	},
	identify: function (options) {
		console.log('identify:', options)
		options = _.extend({
			"personGroupId":"group",
			"faceIds":[],
			"maxNumOfCandidatesReturned":1,
			"confidenceThreshold": 0.5
		}, options)
		return request.post('/identify', options)
		.then(function (data) {
			return data[0].candidates[0]
		})
		.catch(function (data) {
			console.log('error:', arguments)
		})
	}

}