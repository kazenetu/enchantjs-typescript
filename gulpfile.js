var gulp = require('gulp');
var typescript = require('gulp-typescript');
var merge2 = require('merge2');
var concat = require('gulp-concat');
var runsequence = require('run-sequence');
var zip = require('gulp-zip');
var replace = require('gulp-replace');

//ライブラリのドキュメント作成
var typedoc = require("gulp-typedoc");
gulp.task('createDoc',function(){
	return gulp
		.src(['./framework/**/**.ts'])
		.pipe(typedoc({ 
			// TypeScript options (see typescript docs) 
			module: "commonjs", 
			target: "es5",
			includeDeclarations: false,
			mode:"file",
			entryPoint :"Rf.ETS.FrameWork",
			// Output options (see typedoc docs) 
			out: "./starter/doc", 
 
			// TypeDoc options (see typedoc docs) 
			name: "efs-framework", 
			ignoreCompilerErrors: false,
			version: true,
		}))
	;
});

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
    return merge2(
            [
                gulp.src(['./example/ImageSpriteSample/*.ts','./typings/ets-framework.d.ts'])
                    .pipe(typescript('./example/ImageSpriteSample/tsconfig.json')).js
                    .pipe(gulp.dest('./build/ImageSpriteSample')),

                gulp.src(['./example/UseEnchantDtsOnly/*.ts','./framework/typings/enchant.d.ts'])
                    .pipe(typescript('./example/UseEnchantDtsOnly/tsconfig.json')).js
                    .pipe(gulp.dest('./build/UseEnchantDtsOnly'))
            ]  
    );
});

//スターターの作成
gulp.task('CreateStarter',['_CreateStarterZip'],function () {
});

//1.スターターの作成準備(ファイルコピー)
gulp.task('_CreateStarterCopyFiles', function () {
    return merge2(
            [
                //starter/simpleへコピー
                gulp.src([
                    './framework/typings/enchant.d.ts'
                ])
                .pipe(gulp.dest('./starter/simple/typings')),

                gulp.src([
                    './assets/resources/*.*'
                ])
                .pipe(gulp.dest('./starter/simple/assets/resources')),

                gulp.src([
                    './assets/js/enchant.js'
                ])
                .pipe(gulp.dest('./starter/simple/assets/js')),

                gulp.src([
                    './example/UseEnchantDtsOnly/**/*.ts'
                ])
                .pipe(gulp.dest('./starter/simple')),

                //starter/use-frameworkへコピー
                gulp.src([
                    './typings/ets-framework.d.ts',
                    './assets/**/*.*'
                ],{base:'./'})
                .pipe(gulp.dest('./starter/use-framework')),

                gulp.src([
                    './example/ImageSpriteSample/**/*.ts'
                ])
                .pipe(gulp.dest('./starter/use-framework'))
            ]  
    );
});

//2.スターターの作成準備(リソースパスの修正)
gulp.task('_CreateStarterReplacePath',['_CreateStarterCopyFiles'], function () {
    return gulp.src(['./starter/**/*.ts','!./starter/**/*.d.ts'],{base:'./starter'})
        .pipe(replace('../../assets/resources/','./assets/resources/'))
        .pipe(gulp.dest('./starter'));
});

//3.スターターの作成準備(ビルド)
gulp.task('_CreateStarterBuild',['_CreateStarterReplacePath'], function () {
    return merge2(
        [
            //TypeScriptのビルド
            gulp.src(['./starter/simple/**/*.ts'])
            .pipe(typescript('./starter/simple/tsconfig.json')).js
            .pipe(gulp.dest('./starter/simple')),

            gulp.src(['./starter/use-framework/**/*.ts'])
            .pipe(typescript('./starter/use-framework/tsconfig.json')).js
            .pipe(gulp.dest('./starter/use-framework'))
        ]
    );
});

//4.スターターの作成準備(zip圧縮)
gulp.task('_CreateStarterZip',['_CreateStarterBuild'], function () {
    return  gulp.src(['./starter/**/*'],{base:'./starter'})
            .pipe(zip('starter.zip'))
            .pipe(gulp.dest('./'))
});

//デフォルト
gulp.task('default',['buildBases'], function () {
    runsequence('buildExamples');
});

