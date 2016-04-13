var gulp = require('gulp');
var typescript = require('gulp-typescript');
var merge2 = require('merge2');
var concat = require('gulp-concat');
var runsequence = require('run-sequence');

//スーパークラスのビルド
var buildBasesProject = typescript.createProject('./framework/tsconfig.json', { sortOutput: true });
gulp.task('_beforeBuildBases',function(){
	var result = gulp.src(["./framework/**/*.ts"])
      .pipe(typescript(buildBasesProject));

    return merge2[
    result.pipe(typescript.filter(
        buildBasesProject
        ,{referencedFrom: ['compileEntry.ts']}
    ))
    //result.js
    .pipe(concat('ets-framework.js'))
    .pipe(gulp.dest('./build'))
    .pipe(gulp.dest('./assets/js'))
    ,
    //dts
    result.dts
    .pipe(concat('ets-framework.d.ts'))
    .pipe(gulp.dest('./build'))
    ];
});

gulp.task('buildBases',['_beforeBuildBases'], function () {
    return gulp.src(['./framework/typings/*.d.ts','./build/ets-framework.d.ts'])
            .pipe(concat('ets-framework.d.ts'))
            .pipe(gulp.dest('./typings'));
});

//実装例のビルド
gulp.task('buildExamples', function () {
    gulp.src(['./example/**/*.ts','./typings/ets-framework.d.ts'])
		.pipe(typescript('./example/tsconfig.json')).js
		.pipe(gulp.dest('./build'));
});

//テスト
gulp.task('test', function () {
    gulp.src(['./test/**/*.ts','./framework/typings/enchant.d.ts'])
		.pipe(typescript('./test/dts/tsconfig.json')).js
		.pipe(gulp.dest('./build'));
});

//デフォルト
gulp.task('default',['buildBases'], function () {
    runsequence('buildExamples');
});

