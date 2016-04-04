var del = require('del');
var gulp = require('gulp');
var typescript = require('gulp-typescript');
var watch = require('gulp-watch');
var exec = require('child_process').exec;
var path = require('path');
var runSequence = require('run-sequence');

var APP_NAME = 'ngRnSeed';
var PATHS = {
  sources: {
    src: 'src/**/*.ts',
    assets: 'src/assets/**/*'
  },
  destination: 'dist',
  app: 'dist/' + APP_NAME,
  modules: [
    'node_modules/angular2/**/*',
    'node_modules/angular2-react-native/**/*',
    'node_modules/hammerjs/**/*',
    'node_modules/reflect-metadata/**/*',
    'node_modules/rxjs/**/*',
    'node_modules/zone.js/**/*'
  ]
};

/**********************************************************************************/
/*****************************   APPLICATION    ***********************************/
/**********************************************************************************/
gulp.task('clean', function (done) {
  del([PATHS.destination], done);
});
gulp.task('!create', ['clean'], function(done) {
  executeInAppDir('react-native init ' + APP_NAME, done, true);
});
gulp.task('init', ['!create'], function() {
  var copier = require('angular2-react-native/tools/copy-dependencies');
  return copier.doCopy(PATHS.modules, PATHS.app + '/node_modules');
});


gulp.task('!assets', function () {
  return gulp.src(PATHS.sources.assets, {base: './src'}).pipe(gulp.dest(PATHS.app));
});
gulp.task('!compile', ['!assets'], function () {
  return ts2js([PATHS.sources.src], PATHS.app);
});

gulp.task('!launch.android', ['!compile'], function(done) {
  executeInAppDir('react-native run-android', done);
});
gulp.task('!launch.ios', ['!compile'], function(done) {
  executeInAppDir('react-native run-ios', done);
});
gulp.task('!start.android', ['!launch.android'], function(neverDone) {
  if (/^win/.test(process.platform)) {
    executeInAppDir('react-native start');
  }
});
gulp.task('watch', function(neverDone) {
  watch([PATHS.sources.src], function() {
    runSequence('!compile');
  });
});
gulp.task('start.android', ['!start.android', 'watch'], function (neverDone) {
});
gulp.task('start.ios', ['!launch.ios', 'watch'], function (neverDone) {
});

/**********************************************************************************/
/*******************************    UTIL     **************************************/
/**********************************************************************************/

function ts2js(path, dest) {
  var tsResult = gulp.src(path.concat(['typings/main.d.ts', 'src/angular2-react-native.d.ts']))
    .pipe(typescript({
        noImplicitAny: true,
        module: 'commonjs',
        target: 'ES5',
        moduleResolution: 'node',
        emitDecoratorMetadata: true,
        experimentalDecorators: true
      },
      undefined,
      customReporter()));
  return tsResult.js.pipe(gulp.dest(dest));
}

function customReporter() {
  return {
    error: (error) => {
      if (error.relativeFilename) {
        console.error(error.message);
      }
    },
    finish: typescript.reporter.defaultFinishHandler
  };
}

function executeInAppDir(command, done, inParentFolder) {
  var cmd = 'mkdir -p dist';
  exec(cmd, function(e, stdout) {
    var dir = './dist';
    if (!inParentFolder) dir += '/' + APP_NAME;
    exec(command, {cwd: dir, maxBuffer: 5000 * 1024}, function(e, stdout) {
      if (e) console.log(e);
      if (done) done();
    }).stdout.on('data', function(data) {
      console.log(data);
    });
  });
}


