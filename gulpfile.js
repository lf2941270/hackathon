var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var ts = Date.now();
var srcPath = './client/assets/admin'

var paths = {
	srcPath: srcPath,
	svg: srcPath + '/svg/*',
	less: srcPath + '/less/*.less',
	images: srcPath + '/images/**/*',
	js: srcPath + '/js/**/*.js'
}

// SVG sprites
gulp.task('sprites', ['images', 'less', 'js'], function () {
	var config = {
		shape: {
			dimension: {
				maxWidth: 35, // this is where you set the icon size. New style requires 24x24
				maxHeight: 35,
				attributes: false
			},
			spacing: { // Add padding
				padding: 0
			}
		},
		mode: {
			css: {
				dest: './styles/',
				bust: false,
				render: {
					css: {
						dest: './_generated/sprite.css'
					},
				},
				sprite: './images/_generated/sprite.svg',
			}
		}
	};
	return gulp.src(paths.svg, {})
		.pipe($.svgSprite(config))
		.pipe(gulp.dest('./dist'));
});

gulp.task('less', function () {
	return gulp.src(paths.less)
		.pipe($.sourcemaps.init())
		.pipe($.less())
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/styles'))
})


gulp.task('images', function () {
	return gulp.src(paths.images)
		.pipe(gulp.dest('./dist/images'))
})
gulp.task('js', function () {
	return gulp.src(paths.js)
		//.pipe($.uglify())
		.pipe($.concat('bundle.js'))
		.pipe(gulp.dest('./dist/js'))
})

gulp.task('default',['sprites'], function () {

})

gulp.task('watch', ['default'], watch);

function watch() {
	gulp.watch(paths.js, ['js']);
	gulp.watch(paths.less, ['less']);
	gulp.watch(paths.images, ['images']);
}