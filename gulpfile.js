var del = require('del');
var gulp = require('gulp');
var typescript = require('gulp-typescript');
var watch = require('gulp-watch');
var exec = require('child_process').exec;
var karma = require('karma').Server;
var path = require('path');
var runSequence = require('run-sequence');
var through2 = require('through2');

var APP_NAME = 'ngRnSeed';
var PATHS = {
  sources: {
    src: 'src/**/*.ts',
    test: 'test/**/*.ts',
    assets: 'src/assets/**/*'
  },
  destination: 'dist',
  karma: 'dist/karma',
  app: 'dist/' + APP_NAME,
  modules: [
    'node_modules/@angular/**/*',
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
gulp.task('transpile', ['!assets'], function () {
  return ts2js([PATHS.sources.src], PATHS.app);
});

gulp.task('!launch.android', ['transpile'], function(done) {
  executeInAppDir('react-native run-android', done);
});
gulp.task('!launch.ios', ['transpile'], function(done) {
  executeInAppDir('react-native run-ios', done);
});
gulp.task('watch', function(neverDone) {
  watch([PATHS.sources.src], function() {
    runSequence('transpile');
  });
});
gulp.task('start.android', ['!launch.android', 'watch'], function (neverDone) {
});
gulp.task('start.ios', ['!launch.ios', 'watch'], function (neverDone) {
});

/**********************************************************************************/
/*************************   UNIT TEST IN BROWSER   *******************************/
/**********************************************************************************/
gulp.task('clean.test', function (done) {
  del([PATHS.karma], done);
});
gulp.task('ts2system', ['clean.test'], function () {
  return ts2js([PATHS.sources.src, PATHS.sources.test], PATHS.karma, true);
});

gulp.task('karma-launch', function() {
  new karma({
    configFile: path.join(__dirname, 'karma.conf.js')
  }).start();
});

gulp.task('karma-run', function (done) {
  runKarma('karma.conf.js', done);
});

gulp.task('test.browser', ['ts2system'], function (neverDone) {
  runSequence(
    'karma-launch',
    function() {
      watch([PATHS.sources.src, PATHS.sources.test], function() {
        runSequence('ts2system', 'karma-run');
      });
    }
  );
});

gulp.task('test.browser/ci', ['ts2system'], function(done) {
  new karma({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true
  }, done).start();
});

/**********************************************************************************/
/*******************************    UTIL     **************************************/
/**********************************************************************************/

function ts2js(path, dest, toSystem) {
  var tsResult = gulp.src(path.concat(['typings/index.d.ts']), toSystem? {base: './'} : {})
    .pipe(typescript({
        noImplicitAny: true,
        module: toSystem ? 'system' : 'commonjs',
        target: 'ES5',
        moduleResolution: 'node',
        emitDecoratorMetadata: true,
        experimentalDecorators: true
      },
      undefined,
      customReporter()));
  if (toSystem) {
    return tsResult.js.pipe(replaceRequire()).pipe(gulp.dest(dest));
  } else {
    return tsResult.js.pipe(gulp.dest(dest));
  }
  
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


function runKarma(configFile, done) {
  var cmd = process.platform === 'win32' ? 'node_modules\\.bin\\karma run ' :
    'node node_modules/.bin/karma run ';
  cmd += configFile;
  exec(cmd, function(e, stdout) {
    // ignore errors, we don't want to fail the build in the interactive (non-ci) mode
    // karma server will print all test failures
    done();
  });
}

function replaceRequire() {
  return through2.obj(function (file, encoding, done) {
    var content = String(file.contents).replace(/require\(/g, 'global.require(');
    file.contents = new Buffer(content);
    this.push(file);
    done();
  });
}
