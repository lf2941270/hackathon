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

	function dataURItoBlob(dataURI) {
		// convert base64/URLEncoded data component to raw binary data held in a string
		var byteString;
		if (dataURI.split(',')[0].indexOf('base64') >= 0)
			byteString = atob(dataURI.split(',')[1]);
		else
			byteString = unescape(dataURI.split(',')[1]);

		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to a typed array
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ia], {type:mimeString});
	}

	function uploadPic() {
		return $.get('/api/upload_token').then(function (data) {
			ctx.drawImage(aVideo, 0, 0, 640, 480);//将获取视频绘制在画布上
			console.log(ctx.getImageData(0, 0, 640, 480))
			var formData = new FormData();

			formData.append('key', data.key);
			formData.append('token', data.token);
			formData.append('file', dataURItoBlob(aCanvas.toDataURL('image/png')));
			return $.ajax({
				type : 'POST',
				url : 'http://up-z1.qiniu.com/',
				data : formData,
				processData : false,
				contentType : false,
			}).then(function (data) {
				return data;
			})
		})
	}
	window.uploadPic = uploadPic;
})()