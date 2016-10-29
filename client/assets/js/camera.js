(function () {
	var aVideo=document.getElementById('video');
	var aCanvas=document.getElementById('canvas');
	var ctx=aCanvas.getContext('2d');

	navigator.getUserMedia = navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia;//获取媒体对象（这里指摄像头）
	navigator.getUserMedia({video:true}, gotStream, noStream);//参数1获取用户打开权限；参数二成功打开后调用，并传一个视频流对象，参数三打开失败后调用，传错误信息

	function gotStream(stream) {
		video.src = URL.createObjectURL(stream);
		video.onerror = function () {
			stream.stop();
		};
		stream.onended = noStream;
		video.onloadedmetadata = function () {
		};
	}
	function noStream(err) {
		alert(err);
	}

	document.getElementById("snap").addEventListener("click", function() {
		ctx.drawImage(aVideo, 0, 0, 640, 480);//将获取视频绘制在画布上
		console.log(ctx.getImageData(0, 0, 640, 480))
	});
})()