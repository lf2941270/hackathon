var conf = require('../conf')
var request = require('request');

var options = {
	headers: {
		'Content-Type': 'application/json',
		'Ocp-Apim-Subscription-Key': '52b81a66611d41f5ad4becd7ab0e2292'
	}
};

['put', 'post', 'get', 'delete'].forEach(function (method) {
	exports[method] = function (path, params) {
		options.method = method;
		options.url = conf.faceURI + path;
		if(params) {
			options.body = JSON.stringify(params);
		}
		console.log('request face api: ', options.url)
		return new Promise(function (resolve, reject) {
			request(options, function (error, response, body) {
				if(error || response.statusCode >= 300) {
					console.log(error || response.body)
					return reject(response.body)
				}
				resolve(JSON.parse(body || '{}'))
			})
		})
	}
})