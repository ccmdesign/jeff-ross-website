var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence').use(gulp);
var nunjucksRender = require('gulp-nunjucks-render');

// Clean "public" folder
gulp.task('clean', function() {
  return del(['public']);
});

// Browser Sync
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });
});

// Sass
gulp.task('sass', function() {
  return gulp.src('source/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/styles'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('vendor', function() {
  return gulp.src('source/static/vendor/**/*')
    .pipe(gulp.dest('public/vendor'));
});

gulp.task('image', function() {
  return gulp.src('source/static/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/img'));
});

gulp.task('custom-files', function() {
  return gulp.src(['source/templates/CNAME', 'source/templates/.nojekyll'])
    .pipe(gulp.dest('public'));
});

gulp.task('js', function() {
  return gulp.src('source/static/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});

// Nunjucks
gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['source/templates/']);

  return gulp.src('source/templates/**/[^_]*.html')
    .pipe(nunjucksRender({ path: 'source/templates' }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('git-push', shell.task([
  'git push origin master',
  'git subtree push --prefix public origin gh-pages',
]))

// IMPORTANT: The "public" folder should NOT be included in the ".gitignore" file
gulp.task('deploy', function() {
  runSequence(
    'clean',
    ['sass', 'js', 'image', 'nunjucks', 'vendor', 'custom-files'],
    'git-push'
  );
});

gulp.task('watch', function() {
  gulp.watch('source/static/**/*.js', ['js']);
  gulp.watch('source/sass/**/*.scss', ['sass']);
  gulp.watch('source/templates/**/*.html', ['nunjucks']);
  gulp.watch('source/static/vendor/**/*', ['vendor']);
  gulp.watch('source/static/img/**/*', ['images']);
});

gulp.task('default', function(callback) {
  runSequence(
    'clean',
    ['sass', 'js', 'image', 'nunjucks', 'vendor'],
    ['browserSync', 'watch'],
    callback
  );
});
