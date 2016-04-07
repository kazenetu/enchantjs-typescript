var gulp = require('gulp');
var typescript = require('gulp-typescript');

gulp.task('default', function () {
    gulp.src(['./Test/**/*.ts','./Typings/**/*.ts'])
		.pipe(typescript('./tsconfig.json')).js
		.pipe(gulp.dest('./build'));
});
