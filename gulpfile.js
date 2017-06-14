const gulp = require('gulp'),
			glp	 = require('gulp-load-plugins'),
			bs 	 = require('browser-sync');

const $ = glp();
const folderDist = 'app'

gulp.task('sass', function() {
	gulp.src('src/sass/*.sass')
	.pipe($.sass())
	.pipe(gulp.dest('.tmp/css'))
	.pipe(bs.reload({stream: true}));
});

gulp.task('html', ['sass','scripts','pug'] , function() {
	gulp.src(['.tmp/*.html'])
	.pipe($.useref({searchPath: ['.tmp', 'src']}))
	.pipe($.if('*.js', $.uglify()))
	.pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: true})))
	.pipe(gulp.dest(folderDist))
})

gulp.task('scripts', function() {
	gulp.src('src/js/**/*.js')
	.pipe($.babel())
	.pipe(gulp.dest('.tmp/js'))
	.pipe(bs.reload({stream: true}));
})

gulp.task('pug', function() {
	gulp.src('src/*.pug')
	.pipe($.pug({pretty: true}))
	.pipe(gulp.dest('.tmp'))
	.pipe(bs.reload({stream: true}));
})

gulp.task('browser-sync',['sass', 'pug', 'scripts'], function() {
	bs.init({
		notify: false,
    port: 3030,
		server: {
			baseDir: [".tmp", "src"]
		}
	});	
	gulp.watch("src/sass/*.sass", ['sass']);
	gulp.watch("src/js/**/*.js", ['scripts']);
	gulp.watch("src/**/*.pug", ['pug']);
	gulp.watch(".tmp/*.html").on('change', bs.reload);
});


gulp.task('build', ['html'], function() {
	return gulp.src(folderDist+'/**/*').pipe($.size({title: 'build', gzip: true}));
})

gulp.task('dev', ['browser-sync']);