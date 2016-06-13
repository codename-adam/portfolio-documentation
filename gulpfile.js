// call for gulp plugin
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');


gulp.task('styles', function() {
  gulp.src('./main.scss')
  .pipe(sass({ includePaths: ['./scss/' ], errLogToConsole: true }))

  // catches error before killing reload
  .on('error', onError)
  .pipe(autoprefixer())
  .pipe(gulp.dest('./css'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })

  gulp.watch('./scss/**/*.scss', ['styles']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);

});


gulp.task('default', ['styles', 'serve']);

function onError(err) {
  console.log(err);
  this.emit('end');
}