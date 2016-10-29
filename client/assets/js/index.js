var socket = io.connect('ws://localhost:3000');


socket.on('order', function(o){
	console.log('order')
	window.uploadPic().then(function (url) {
		console.log(url)
	})
});

