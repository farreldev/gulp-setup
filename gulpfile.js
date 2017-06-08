var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    bs = require('browser-sync');

gulp.task('sass', function() {
    gulp.src('sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(bs.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    })
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("sass/*.sass", ['sass']);
    gulp.watch("*.html").on('change', bs.reload);
});

gulp.task('default', ['watch', 'sass', 'browser-sync']);