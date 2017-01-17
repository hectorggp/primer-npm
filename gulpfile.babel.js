// -- Gulp Plugins ------------------------------------
import gulp from 'gulp';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import gutil from 'gulp-util';
import connect from 'gulp-connect'

// -- Helper functions --------------------------------
function bundle(b) {
  return b.bundle()
    .on('error', (err) => console.log(err))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public'));
}

// -- Gulp Tasks --------------------------------------
gulp.task('copy', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'))
    .pipe(connect.reload());
});

gulp.task('build', ['copy'], () => {
  const b = browserify('./src/app.js')
    .transform(babelify.configute({
      "optional": ["es7.decorators"],
      "plugins": [
        "angular2-annotations"
      ]
    }));

  return bundle(b);
});

gulp.task('watch', () => {
  gulp.watch('./src/*.html', ['copy']);

  const b = browserify('./src/app.js', watchify.args)
    .transform(babelify);

  const w = watchify(b)
    .on('update', () => bundle(w))
    .on('log', gutil.log);

  return bundle(w);
});

gulp.task('webserver', () => {
  connect.server({
    root: './public',
    hostname: '0.0.0.0',
    port: 9000,
    livereload: true
  });
});

gulp.task('default', ['copy', 'webserver', 'watch']);
