var gulp = require('gulp');
var typescript = require('gulp-typescript');

//デフォルト
gulp.task('default', function () {
  return gulp.src(['./**/*.ts','!./node_modules/**/*.ts'])
    .pipe(typescript('./tsconfig.json')).js
    .pipe(gulp.dest('./'));
});
