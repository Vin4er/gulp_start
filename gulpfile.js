var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	webserver = require('gulp-webserver'),
	autoprefixer = require('gulp-autoprefixer');
	jade = require('gulp-jade'),
	jadeOrig = require('jade');
	stylus = require('gulp-stylus'),
    spritesmith = require('gulp.spritesmith'),
    concat = require('gulp-concat'); // Склейка файлов


// Локальный сервер
gulp.task('webserver', function() {
	gulp.src('public')
	.pipe(webserver({
		host: '192.168.120.133', // Если нужен сервер в сети ставьте 0.0.0.0
		port: 3002,
		livereload: true,
		open: "/index.html"
	}));
});

// Пути к файлам
path = {
	html: {
		source: ['./dev/**/*.jade', './dev/layouts/*.jade', './dev/layouts/**/*.jade'],
		watch: './dev/**/*.jade',
		destination: './public/',
		basedir: './dev'
	},
	css: {
		source: ['./dev/css/*.styl', '!./dev/css/lib/**/*.styl', '!./dev/**/_*.styl', './dev/css/*.css'],
		watch: './dev/**/*.styl',
		destination: './public/assets/css/'
	},
	img: { 
		source: './dev/img/**/*.{jpg,jpeg,png,gif}',
		watch: './dev/img/**/*',
		destination: './public/assets/img'
	},
	js: {
		source: './dev/js/**/*',
		watch: './dev/js/**/*',
		destination: './public/assets/js'
	},
	sprite: {
		source: './dev/img/sprite/*.png',
		icons:  './dev/img/',
		style:  './dev/css/',
		watch: './dev/img/sprite/*',

	}
};

// Собираем JS
gulp.task('js', function() {
    gulp.src(['./dev/js/**/*', './dev/js/*'])
    .pipe(gulp.dest('./public/assets/js'))
});


// стпрайты
gulp.task('sprite', function() {
	var spriteData = gulp.src(path.sprite.source) 
	    .pipe(spritesmith({
	    	algorithm: 'binary-tree',
	        imgName: '../img/sprite.png',
	        cssName: 'sprite.css',
	    }));

    spriteData.img.pipe(gulp.dest(path.sprite.icons)); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(path.sprite.style)); // путь, куда сохраняем стили
});

// Собираем Stylus
gulp.task('stylus', function() {
	gulp.src(path.css.source)
		.pipe(stylus())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(concat('css.css'))
		.pipe(gulp.dest(path.css.destination));
});

// Собираем html из Jade
gulp.task('jade', function() {
	gulp.src(path.html.source)
		.pipe(jade({
			jade: jadeOrig,
			pretty: '\t',
			basedir: path.html.basedir,
			data: gulp.src(['users.json'])
		}))
		.pipe(gulp.dest(path.html.destination));
});
//Копируем изображения и сразу их обновляем
gulp.task('images', function() {
    gulp.src('dev/img/**/*')
        .pipe(gulp.dest('public/assets/img'));
});

	// Watch Task
gulp.task('watch', function(){
 	livereload.listen();
  	gulp.watch(path.sprite.watch, ['sprite']).on('change', livereload.changed);
  	gulp.watch(path.img.watch, ['images']).on('change', livereload.changed);
  	gulp.watch(path.js.watch, ['js']).on('change', livereload.changed);
  	gulp.watch(path.css.watch, ['stylus']).on('change', livereload.changed);
	gulp.watch(path.html.watch, ['jade']).on('change', livereload.changed);
});


gulp.task("build", ['images', 'sprite', 'js' ,'stylus', 'jade']);
// Default Task
gulp.task('default', ['build', 'watch', "webserver"]);