module.exports = function (gulp, plugins, task) {
  let sourceRoot = './html/';
  let sourcePath = [
    sourceRoot + '**/*.{html,ico}',
    '!' + sourceRoot + 'index.debug.html'
  ];
  let sourcePathDebug = [
    sourceRoot + '**/*.{html,ico}',
    '!' + sourceRoot + 'index.html'
  ];
  let destinationPath = './../release/wwwroot/';

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':build', callback);
    },
    release: function (callback) {
      plugins.runSequence(task + ':clean', task + ':release:build', callback);
    },
    'release-aot': function (callback) {
      plugins.runSequence(task + ':clean', task + ':release:build', callback);
    },
    build: function () {
      return gulp.src(sourcePathDebug)
        .pipe(plugins.rename(function (path) {
          path.basename = path.basename.replace('.debug', '');
        }))
        .pipe(gulp.dest(destinationPath));
    },
    'release:build': function () {
      return gulp.src(sourcePath)
        .pipe(gulp.dest(destinationPath));
    },
    clean: function () {
      return gulp.src([destinationPath + '*.{html,ico}'])
        .pipe(plugins.clean({force: true}));
    },
    watch: function () {
      return gulp.watch(sourcePath, [task]);
    }
  };
};