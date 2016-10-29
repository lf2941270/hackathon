const _ = require('lodash');
const request = require('request')
const uuid = require('uuid')

const personGroup = require('./person-group')
const person = require('./person')
const face = require('./face')
const app = require('../app');
const conf = require('../conf')
app.context.isFaceApiSetup = true;

function setupFaceApi(detectData, faceUrl) {
	personGroup.delete().then(function (data) {
		return personGroup.create()
	}, function () {
		return personGroup.create()
	}).then(function () {
		person.create('group', detectData.faceId).then(function (data) {
				return person.addFace({
					personGroupId: 'group',
					personId: data.personId,
					targetFace: [detectData.faceRectangle.left, detectData.faceRectangle.top, detectData.faceRectangle.width, detectData.faceRectangle.height].join(','),
					faceUrl: faceUrl
				})
			})
			.then(function (data) {
				return personGroup.train('group')
			})
			.then(function (data) {
				console.log('Face Api setup success!')
			})
	})

}
function storage(data, detectData, orderId, url, personCount) {
	var order = app.context.cache[orderId];
	delete app.context.cache[orderId];
	var storageData = {
		personId: data.personId,
		url: url,
		male: detectData[0].faceAttributes.gender,
		age: detectData[0].faceAttributes.age,
		smile: detectData[0].faceAttributes.smile,
		glasses: detectData[0].faceAttributes.glasses,
		personCount: personCount,
		order: order
	}
	console.log('Storage data to database:', storageData)

	return request({
		headers: {
			'Content-Type': 'application/json',
		},
		url: 'http://192.168.191.3:8080/data/postdata.do',
		method: 'post',
		body: JSON.stringify(storageData)
	}, function (error) {
		console.log(error)
	})
}


exports.process = function (url, orderId) {
	return face.detect(url).then(function (detectData) {
		if (!app.context.isFaceApiSetup) {
			app.context.isFaceApiSetup = true;
			return setupFaceApi(detectData[0], url);
		}
		console.log(detectData)
		var personCount = detectData.length;

		personCount && face.identify({
			faceIds: [_.sortBy(detectData, function (item) {
				return Math.abs((item.faceRectangle.left + item.faceRectangle.width / 2) / conf.camera.width - 0.5)
			})[0].faceId]
		}).then(function (data) {
			if (data) {
				storage(data, detectData, orderId, url, personCount);
			} else {
				person.create('group', detectData[0].faceId).then(function (data) {
						storage(data, detectData, orderId, url);
						return person.addFace({
							personGroupId: 'group',
							personId: data.personId,
							targetFace: [detectData[0].faceRectangle.left, detectData[0].faceRectangle.top, detectData[0].faceRectangle.width, detectData[0].faceRectangle.height].join(','),
							faceUrl: url
						})
					})
					.then(function (personData) {
						return personGroup.train('group')
					})
					.then(function (data) {
						console.log('group trained success')
					})
			}

		})
	})
}