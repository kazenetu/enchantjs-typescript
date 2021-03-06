var gulp = require('gulp');
var typescript = require('gulp-typescript');

//サンプルのビルド
gulp.task('buildSimple', function () {
  return gulp.src(['./simple/**/*.ts','!./**/node_modules/**/*.ts'])
    .pipe(typescript('./simple/tsconfig.json')).js
    .pipe(gulp.dest('./simple'));
});

gulp.task('buildUseFramework',
  ['buildUseFrameworkImageSpriteSample',
    'buildUseFrameworkLoginSample',
    'buildUseFramework2DRPGMapSample',
    'buildUseFrameworkTemplate'
  ], function () {
  });
gulp.task('buildUseFrameworkImageSpriteSample', function () {
  return gulp.src(['./use-framework/ImageSpriteSample/**/*.ts','!./**/node_modules/**/*.ts'])
    .pipe(typescript('./use-framework/ImageSpriteSample/tsconfig.json')).js
    .pipe(gulp.dest('./use-framework/ImageSpriteSample'));
});
gulp.task('buildUseFrameworkLoginSample', function () {
  return gulp.src(['./use-framework/LoginSample/**/*.ts','!./**/node_modules/**/*.ts'])
    .pipe(typescript('./use-framework/LoginSample/tsconfig.json')).js
    .pipe(gulp.dest('./use-framework/LoginSample'));
});
gulp.task('buildUseFramework2DRPGMapSample', function () {
  return gulp.src(['./use-framework/2DRPGMapSample/**/*.ts','!./**/node_modules/**/*.ts'])
    .pipe(typescript('./use-framework/2DRPGMapSample/tsconfig.json')).js
    .pipe(gulp.dest('./use-framework/2DRPGMapSample'));
});
gulp.task('buildUseFrameworkTemplate', function () {
  return gulp.src(['./use-framework/template/**/*.ts','!./**/node_modules/**/*.ts'])
    .pipe(typescript('./use-framework/template/tsconfig.json')).js
    .pipe(gulp.dest('./use-framework/template'));
});

//デフォルト
gulp.task('default', ['buildSimple', 'buildUseFramework'], function () {
});

