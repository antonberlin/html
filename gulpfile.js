const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify'),
	 concat = require('gulp-concat');

const config = {
	root: './src/',
	html: {
		src: 'index.html',
	},
	css: {
		watch: 'less/**/*.less',
		src: 'less/+(styles).less',
		dest: 'css'
	}
};

gulp.task('build', function(){
	gulp.src(config.root + config.css.src)
		.pipe(less())
		.pipe(gcmq())
		.pipe(autoprefixer({
			browsers: ['> 0.1%'],
			cascade: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(gulp.dest(config.root + config.css.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
});
gulp.task('scripts', function(){
	gulp.src(config.root + 'js/*.js')
		.pipe(concat('myproject.js')) // cancatenation to file myproject.js
        .pipe(uglify()) // uglifying this file
        .pipe(gulp.dest('./public/js/')) // save file to destination directory
});

gulp.task('image', function(){
	gulp.src(config.root + 'images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'));
});

gulp.task('watch', ['browserSync'], function(){
	gulp.watch(config.root + config.css.watch, ['build']);
	gulp.watch(config.root + config.html.src, browserSync.reload);
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: config.root
		}
	});
});

const smartgrid = require('smart-grid');

gulp.task('grid',function(){
	smartgrid('src/less', {
		container: {
			maxWidth: '1250px'
		}
	});
});