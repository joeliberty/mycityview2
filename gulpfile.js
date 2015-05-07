/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imageop = require('gulp-image-optimization'),
    htmlhint = require("gulp-htmlhint"),
    imagemin = require('gulp-imagemin'),
    // jpegoptim = require('imagemin-jpegoptim'),
    jpegtran = require('imagemin-jpegtran'),
    pngquant = require('imagemin-pngquant'),
    optipng = require('imagemin-optipng'),
    svgo = require('imagemin-svgo');

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});


// define the default task and add the watch task to it
// gulp.task('default', ['watch']);

//configure images 
gulp.task('opt-images', function(cb) {
     gulp.src(['src/images/**/*.png','src/images/**/*.jpg','src/images/**/*.gif','src/images/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('build/images')).on('end', cb).on('error', cb);
});

gulp.task('comp-images', function() {
   gulp.src('src/images/**/*.{gif,jpg,png}')
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        svgoPlugins: [ {removeViewBox:false}, {removeUselessStrokeAndFill:false} ]
    }))
    .pipe(pngquant({quality: '65-80', speed: 4})())
    // .pipe(jpegoptim({ progressive: true })())
    .pipe(jpegtran({progressive: true})())
    .pipe(optipng({optimizationLevel: 3})())
    .pipe(gulp.dest('build/images'))
});

// configure the jshint task
gulp.task('htmlhint', function() { 
    return gulp.src('src/partials/**/*.html')
        .pipe(htmlhint({'doctype-first': false}))
        .pipe(htmlhint.reporter())
        .pipe(gulp.dest('build/partials'));
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['jshint']);
  gulp.watch('src/scss/**/*.scss', ['build-css']);
});

gulp.task('build-css', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())  // Process the original sources
      .pipe(sass())
    .pipe(sourcemaps.write()) // Add the map to modified source.
    .pipe(gulp.dest('build'));
});

gulp.task('build-js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});