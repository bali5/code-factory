module.exports = function (gulp, plugins, task) {
  let sourceRoot = './styles/';
  let iconPath = './node_modules/material-design-icons/iconfont/';
  let sourcePath = [
    iconPath + 'material-icons.css',
    sourceRoot + '**/*.scss'
  ];
  let destinationPath = './../server/src/CodeFactory/wwwroot/styles/';

  return {
    default: function (callback) {
      plugins.runSequence(task + ':clean', task + ':icon', task + ':fix', task + ':build', callback);
    },
    release: function (callback) {
      plugins.runSequence(task + ':clean', task + ':icon', task + ':fix', task + ':build', callback);
    },
    'release-aot': function (callback) {
      plugins.runSequence(task + ':clean', task + ':icon', task + ':fix', task + ':build', callback);
    },
    icon:  function () {
      return gulp.src(iconPath + '*.{eot,ijmap,svg,ttf,woff,woff2}')
        .pipe(gulp.dest(destinationPath));
    },
    fix: function() {
      /** Fix for Error: It's not clear which file to import for '@import "overlay/overlay"'. */
      return gulp.src(['node_modules/@angular/material/core/overlay/overlay.css'])
        .pipe(plugins.clean({force: true}));
    },
    build: function () {
      return gulp.src(sourcePath)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer())
        .pipe(plugins.concat('styles.min.css'))
        //.pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('.', { includeContent: false, sourceRoot: sourceRoot }))
        .pipe(gulp.dest(destinationPath));
    },
    clean: function () {
      return gulp.src([destinationPath])
        .pipe(plugins.clean({force: true}));
    },
    watch: function () {
      return gulp.watch(sourcePath, [task]);
    }
  };
};