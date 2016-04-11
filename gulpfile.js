var gulp = require('gulp');
var typescript = require('gulp-typescript');
var merge2 = require('merge2');
var concat = require('gulp-concat');

gulp.task('default', function () {
    gulp.src(['./test/**/*.ts','./typings/**/*.ts'])
		.pipe(typescript('./test/dts/tsconfig.json')).js
		.pipe(gulp.dest('./build'));
});

//スーパークラスのビルド
var buildBasesProject = typescript.createProject('./framework/tsconfig.json', { sortOutput: true });
gulp.task('buildBases',function(){
	var result = gulp.src(["./framework/**/*.ts",'./typings/enchant.d.ts'])
      .pipe(typescript(buildBasesProject));

    return merge2[
    result.pipe(typescript.filter(
        buildBasesProject
        ,{referencedFrom: ['Base\\GameMain.ts']}
    ))
    //result.js
    .pipe(concat('base.js'))
    .pipe(gulp.dest('./build'))
    .pipe(gulp.dest('./assets/js'))
    ,
    //dts
    result.dts
    .pipe(concat('base.d.ts'))
    .pipe(gulp.dest('./build'))
    .pipe(gulp.dest('./typings'))
    ];
});

//実装例のビルド
gulp.task('buildExamples', function () {
    gulp.src(['./example/**/*.ts','./typings/**/*.ts'])
		.pipe(typescript('./example/tsconfig.json')).js
		.pipe(gulp.dest('./build'));
});
