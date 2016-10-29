var socket = io.connect('//');

socket.on('fakeOrder', function (data) {
	function fake() {
		console.log(data.orderId, '~~~~~~~~1212312~~~~~')

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

socket.on('order', function(data){
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

socket.on('identify', function(data){
	console.log('identify')
	console.log(data)
});
