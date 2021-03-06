// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass({
          includePaths: [
            './bower_components/bootstrap-sass-official/assets/stylesheets'
          ]
        }))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

// Compile our coffee
gulp.task('coffee', function() {
  gulp.src('coffee/*.coffee')
  .pipe(coffee({bare: true}))
  .pipe(gulp.dest('js'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('coffee/*.coffee', ['coffee']);
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('*.html', function(e){
    livereload.changed(e.path);
  });
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'coffee', 'scripts', 'watch']);
