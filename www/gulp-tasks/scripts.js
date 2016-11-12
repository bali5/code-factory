var os = require('os');
var exec = require('child_process').exec;

module.exports = function (gulp, plugins, task) {
  var Builder = require('systemjs-builder');

  var sourceRoot = './scripts/';
  var sourcePath = [
    sourceRoot + '**/*.ts',
    '!' + sourceRoot + 'main.aot.ts'
  ];
  var buildPath = './build/scripts/';
  var aotPath = './aot/';
  var destinationPath = './../server/src/CodeFactory/wwwroot/scripts/';
  var destinationBuildPath = './../server/src/CodeFactory/wwwroot/build/scripts/';

  var libsSourceRoot = './node_modules/';
  var libsSourcePath = [
    libsSourceRoot + 'core-js/client/shim.min.js',
    libsSourceRoot + 'zone.js/dist/zone.js',
    libsSourceRoot + 'systemjs/dist/system.src.js',
    './config.js'
  ];

  var libsSourceRootDebug = './**node_modules/';
  var libsSourcePathDebug = [
    libsSourceRootDebug + 'zone.js/**/*.js',
    libsSourceRootDebug + 'systemjs/**/*.js'
  ];

  var project = plugins.typescript.createProject('./tsconfig.json', {
    //Use TS version installed by NPM instead of gulp-typescript's built-in
    typescript: require('typescript')
  });

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', task + ':bundle', task + ':bundle:source', task + ':loader', callback);
    },
    release: function (callback) {
      plugins.runSequence(task + ':clean', task + ':release:build', task + ':release:bundle', task + ':release:libs', task + ':concat', callback);
    },
    'release-aot': function (callback) {
      plugins.runSequence(task + ':clean', task + ':aot:build', task + ':aot:rename', task + ':aot:bundle', task + ':release:libs', task + ':concat', callback);
    },
    build: function () {
      return gulp.src(sourcePath)
        .pipe(plugins.sourcemaps.init())
        .pipe(project())
        .pipe(plugins.sourcemaps.write('.', { includeContent: false, sourceRoot: '.' }))
        .pipe(gulp.dest(destinationBuildPath));
    },
    'release:build': function () {
      return project.src(sourcePath)
        .pipe(project())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(buildPath));
    },
    'aot:build': function (callback) {
      var cmd = os.platform() === 'win32' ? '"node_modules/.bin/ngc" -p tsconfig-aot.json' : 'node_modules/.bin/ngc -p tsconfig-aot.json';

      exec(cmd, function (err, stdout, stderr) {
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.log(stderr);
        }
        callback(err);
      });
    },
    // This needed for bundling to work
    // No idea why import can't find the js files with the extension
    'aot:rename': function () {
      return gulp.src(buildPath + '/**/*.js')
        .pipe(plugins.rename(function (path) {
          path.basename = path.basename.replace('.aot', '');
        }))
        .pipe(gulp.dest(buildPath))
        .pipe(plugins.rename({
          extname: ''
        }))
        .pipe(gulp.dest(buildPath));
    },
    bundle: function () {
      var sys = require('./../config.js');
      return gulp.src(Object.keys(System.packages).map(function (m) {
        var index = m.indexOf('node_modules');
        return './**' + m.substr(index) + '/**/*.js'; 
      }).concat(libsSourcePathDebug).concat(['config.js']))
        .pipe(gulp.dest(destinationPath + '../'));
    },
    'bundle:source': function () {
      return gulp.src(['scripts/**/*.ts'])
        .pipe(gulp.dest(destinationPath));
    },
    'release:bundle': function () {
      var builder = new Builder('', './config.js');
      return builder.buildStatic('app', buildPath + '/app.js', { minify: true, sourceMaps: false });
    },
    'aot:bundle': function () {
      var builder = new Builder('', './config.js');
      return builder.buildStatic('app', buildPath + '/app.js', { minify: true, sourceMaps: false });
    },
    doc: function (callback) {
      var cmd = os.platform() === 'win32' ? '"node_modules/.bin/typedoc" --mode modules --out documentation/doc src' : 'node_modules/.bin/typedoc --mode modules --out documentation/doc src';

      exec(cmd, function (err, stdout, stderr) {
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.log(stderr);
        }
        callback(err);
      });
    },
    loader: function () {
      return gulp.src(sourceRoot + 'loader.js')
        .pipe(gulp.dest(destinationPath));
    },
    libs: function () {
      return gulp.src(libsSourcePath)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('libs.js'))
        .pipe(plugins.sourcemaps.write('.', { includeContent: true }))
        .pipe(gulp.dest(buildPath));
    },
    'release:libs': function () {
      return gulp.src(libsSourcePath)
        .pipe(plugins.concat('libs.js'))
        .pipe(gulp.dest(buildPath));
    },
    concat: function () {
      return gulp.src([buildPath + 'libs.js', buildPath + 'app.js'])
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest(destinationPath));
    },
    clean: function () {
      return gulp.src([destinationPath, buildPath, aotPath])
        .pipe(plugins.clean({ force: true }));
    },
    watch: function () {
      return gulp.watch(sourcePath, [task + ':build', task + ':bundle:source']);
    }
  };
};
