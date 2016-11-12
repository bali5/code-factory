var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'run-sequence'],
  replaceString: /^(gulp)(-|\.)/
});
var taskListing = plugins.taskListing;

gulp.task('help', taskListing);

function initTasks(name) {
  var splits = name.split(':');
  var tasks = require('./gulp-tasks/' + splits[0])(gulp, plugins, splits[0]);
  for (var task in tasks) {
    if (task == 'default') {
      gulp.task(name, tasks[task]);
    } else {
      gulp.task(name + ':' + task, tasks[task]);
    }
  }
}

var buildTasks = [
  'html',
  'images',
  'scripts',
  'styles',
  'views'
];

var watchTasks = buildTasks.map((m) => m + ':watch');
var cleanTasks = buildTasks.map((m) => m + ':clean');
var tasks = [].concat(watchTasks, buildTasks);

for (var name of buildTasks) {
  initTasks(name);
}

gulp.task('default', function (callback) {
  plugins.runSequence(...tasks, callback);
});
gulp.task('release', function (callback) {
  plugins.runSequence(...buildTasks.map((m) => m + ':release'), callback);
});
gulp.task('release-aot', function (callback) {
  plugins.runSequence(...buildTasks.map((m) => m == 'scripts' ? m + ':release-aot' : m + ':release'), callback);
});
gulp.task('build', buildTasks);
gulp.task('clean', cleanTasks, function () {
  return gulp.src('./release')
    .pipe(plugins.clean({ force: true }));
});
gulp.task('clean:release', function () {
  return gulp.src('./release')
    .pipe(plugins.clean({ force: true }));
});
