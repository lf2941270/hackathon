$('.nav-left li').click(function () {
	if (!$(this).hasClass('active')) {
		var oldTarget = $(this).parent().find('.active').data('target')
		$(this).parent().find('.active').removeClass('active').find('img').attr('src', '/images/' + oldTarget + '.png')
		$(this).addClass('active').find('img').attr('src', '/images/' + $(this).data('target') + '-active.png');
		$('[data-route=' + oldTarget + ']').hide();
		$('[data-route=' + $(this).data('target') + ']').show();

	}
})

$.get('/api/todayInfo').then(function (data) {
		return JSON.parse(data)
	})
	.then(function (data) {
		Object.keys(data).forEach(function (item) {
			$('.' + item).text(data[item])
		})
	})
