var gulp = require('gulp');
var typescript = require('gulp-typescript');

//サンプルのビルド
gulp.task('buildSimple', function () {
  return gulp.src(['./simple/**/*.ts'])
      .pipe(typescript('./simple/tsconfig.json')).js
      .pipe(gulp.dest('./simple'));
});
gulp.task('buildUseFramework', function () {
  return gulp.src(['./use-framework/**/*.ts'])
      .pipe(typescript('./use-framework/tsconfig.json')).js
      .pipe(gulp.dest('./use-framework'));
});

//デフォルト
gulp.task('default',['buildSimple','buildUseFramework'], function () {
});

