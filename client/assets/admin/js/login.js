$('#login-btn').click(function (e) {
	e.preventDefault();
	$.ajax({
		url: '/api/login',
		method: 'post',
		data: {
			user: $('#user').val(),
			password: $('#password').val()
		}
	}).then(function (data) {
		if(data.status === 'success') {
			location.href = '/'
		} else {
			$('.error').html(data.error)
		}
	})
})

$('input').on('focus', function () {
	$('.error').html('')
})