var gulp = require('gulp');
var typescript = require('gulp-typescript');
var merge2 = require('merge2');
var concat = require('gulp-concat');
var runsequence = require('run-sequence');
var zip = require('gulp-zip');
var replace = require('gulp-replace');
var markdown = require('gulp-markdown');
var pug = require('gulp-pug');
var webserver = require('gulp-webserver');

//ライブラリのドキュメント作成
var typedocModule = require("typedoc");

typedocModule.converter.GitHubPlugin.prototype.onEndResolve = function (context) {
    var _this = this;
    var project = context.project;
    var destBaseUrl = null;
    project.files.forEach(function (sourceFile) {
        var repository = _this.getRepository(sourceFile.fullFileName);
        if (repository) {
            var srcUrl = repository.getGitHubURL(sourceFile.fullFileName);
            destBaseUrl = [
                'https://github.com',
                repository.gitHubUser,
                repository.gitHubProject,
                'blob',
                'master',
                'framework',
                ''
            ].join('/');
            sourceFile.url = destBaseUrl+sourceFile.fileName;
        }
    });
    for (var key in project.reflections) {
        var reflection = project.reflections[key];
        if (reflection.sources)
            reflection.sources.forEach(function (source) {
                if(destBaseUrl !== null){
                    source.file.url = destBaseUrl+source.file.fileName;
                }
                if (source.file && source.file.url) {
                    source.url = source.file.url + '#L' + source.line;
                }
            });
    }
};

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
			//version: false,
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
    .pipe(gulp.dest('./temp'))
    ];
});

gulp.task('buildBases',['_beforeBuildBases'], function () {
    return gulp.src(['./framework/typings/*.d.ts','./temp/ets-framework.d.ts'])
            .pipe(concat('ets-framework.d.ts'))
            .pipe(gulp.dest('./typings'))
            .pipe(gulp.dest('./build'));
});

//実装例のビルド
gulp.task('buildExamples', function () {
    return merge2(
            [
                gulp.src(['./example/ImageSpriteSample/*.ts','./typings/ets-framework.d.ts'])
                    .pipe(typescript('./example/ImageSpriteSample/tsconfig.json')).js
                    .pipe(gulp.dest('./build/ImageSpriteSample')),

                gulp.src(['./example/LoginSample/*.ts','./typings/ets-framework.d.ts'])
                    .pipe(typescript('./example/LoginSample/tsconfig.json')).js
                    .pipe(gulp.dest('./build/LoginSample')),

                gulp.src(['./example/2DRPGMapSample/*.ts','./typings/ets-framework.d.ts'])
                    .pipe(typescript('./example/2DRPGMapSample/tsconfig.json')).js
                    .pipe(gulp.dest('./build/2DRPGMapSample')),

                gulp.src(['./example/template/*.ts','./typings/ets-framework.d.ts'])
                    .pipe(typescript('./example/template/tsconfig.json')).js
                    .pipe(gulp.dest('./build/template')),

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

                //starter/use-framework/ImageSpriteSampleへコピー
                gulp.src([
                    './typings/ets-framework.d.ts',
                    './assets/**/*.*'
                ],{base:'./'})
                .pipe(gulp.dest('./starter/use-framework/ImageSpriteSample')),

                gulp.src([
                    './example/ImageSpriteSample/**/*.ts'
                ])
                .pipe(gulp.dest('./starter/use-framework/ImageSpriteSample')),

                //starter/use-framework/LoginSampleへコピー
                gulp.src([
                    './typings/ets-framework.d.ts',
                    './assets/js/*.*'
                ],{base:'./'})
                .pipe(gulp.dest('./starter/use-framework/LoginSample')),
                gulp.src([
                    './example/LoginSample/assets/**/*.*'
                ],{base:'./example/LoginSample/'})
                .pipe(gulp.dest('./starter/use-framework/LoginSample')),

                gulp.src([
                    './example/LoginSample/**/*.ts'
                ])
                .pipe(gulp.dest('./starter/use-framework/LoginSample')),
                
                //starter/use-framework/2DRPGMapSampleへコピー
                gulp.src([
                    './typings/ets-framework.d.ts',
                    './assets/js/*.*'
                ],{base:'./'})
                .pipe(gulp.dest('./starter/use-framework/2DRPGMapSample')),
                gulp.src([
                    './example/2DRPGMapSample/assets/**/*.*'
                ],{base:'./example/2DRPGMapSample'})
                .pipe(gulp.dest('./starter/use-framework/2DRPGMapSample')),

                gulp.src([
                    './example/2DRPGMapSample/**/*.ts'
                ])
                .pipe(gulp.dest('./starter/use-framework/2DRPGMapSample')),
                
                //starter/use-framework/templateへコピー
                gulp.src([
                    './typings/ets-framework.d.ts',
                    './assets/js/*.*'
                ],{base:'./'})
                .pipe(gulp.dest('./starter/use-framework/template')),

                gulp.src([
                    './example/template/**/*.ts'
                ])
                .pipe(gulp.dest('./starter/use-framework/template'))
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

            gulp.src(['./starter/use-framework/ImageSpriteSample/**/*.ts'])
            .pipe(typescript('./starter/use-framework/ImageSpriteSample/tsconfig.json')).js
            .pipe(gulp.dest('./starter/use-framework/ImageSpriteSample')),

            gulp.src(['./starter/use-framework/LoginSample/**/*.ts'])
            .pipe(typescript('./starter/use-framework/LoginSample/tsconfig.json')).js
            .pipe(gulp.dest('./starter/use-framework/LoginSample')),

            gulp.src(['./starter/use-framework/2DRPGMapSample/**/*.ts'])
            .pipe(typescript('./starter/use-framework/2DRPGMapSample/tsconfig.json')).js
            .pipe(gulp.dest('./starter/use-framework/2DRPGMapSample')),

            gulp.src(['./starter/use-framework/template/**/*.ts'])
            .pipe(typescript('./starter/use-framework/template/tsconfig.json')).js
            .pipe(gulp.dest('./starter/use-framework/template'))
        ]
    );
});

//4.readme.mdをhtmlタグに変換
gulp.task('_CreateStarterConvertMD',['_CreateStarterBuild'], function () {
    return gulp.src('./starter/README.md')
        .pipe(markdown())
        .pipe(gulp.dest('./temp'));
});

//5.変換したhtmlタグをベースにHTMLを作成
gulp.task('_CreateStarterCreateHTML',['_CreateStarterConvertMD'], function () {
  return gulp.src('./pug-files/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./starter'));
});

//6.スターターの作成準備(zip圧縮)
gulp.task('_CreateStarterZip',['_CreateStarterCreateHTML'], function () {
    return  gulp.src(['./starter/**/*'],{base:'./starter'})
            .pipe(zip('starter.zip'))
            .pipe(gulp.dest('./'))
});

//デフォルト
gulp.task('default',['buildBases'], function () {
    runsequence('buildExamples');
});

gulp.task('startServer', function() {
  webStream = gulp.src('./').pipe(webserver());
});
