var socket = io.connect('//');

socket.on('fakeOrder', function (data) {
	function fake() {
		console.log(data.orderId)

		$.post('/api/pic', {
			url: data.url,
			orderId: data.orderId
		}).catch(function () {
			//if fail, retry!
			//fake()
		})
	}

	fake()
})

socket.on('order', function (data) {
	console.log('order')
	function uploadCustomerPic() {
		window.uploadPic().then(function (url) {
			console.log(url)
			$('#img').attr('src', url)
			$.post('/api/pic', {
				url: url,
				orderId: data.orderNumber
			}).catch(function () {
				//if fail, retry!
				uploadCustomerPic()
			})
		})
	}

	uploadCustomerPic()
});

socket.on('identify', function (data) {
	if (data.type === 'old') {
		console.log('成功识别到老用户', data)
	} else {
		console.log('成功检测到新用户', data)
	}
});


socket.on('detect', function (data) {
	console.log('检测失败,没有检测到人脸');
})
