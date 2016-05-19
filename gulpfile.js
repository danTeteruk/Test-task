var gulp = require('gulp');
var gconcat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter'); // filter files according to some pattern
var imagemin = require('gulp-imagemin'); // images minification

var pth = {
   src: '*',
   build: 'build'
};

gulp.task('bower', function() {
    var cssFilter = filter('style.css');
    return gulp.src(mainBowerFiles())
        .pipe(cssFilter)
        .pipe(gconcat('vendor.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(pth.build + '/css'))
});


gulp.task('styles', function() {
   return gulp.src(pth.src + 'style.css')
       .pipe(gconcat('main.css'))
       .pipe(cssmin())
       .pipe(gulp.dest(pth.build + '/css'))
});

gulp.task('html', function() {
   return gulp.src(pth.src + 'index.html')
       .pipe(htmlmin({collapseWhitespace: true}))
       .pipe(gulp.dest(pth.build))
});


gulp.task('images', function() {
   return gulp.src(pth.src + 'img/*')
       .pipe(imagemin({progressive: true}))
       .pipe(gulp.dest(pth.build + '/img'))
});



gulp.task('build', ['bower', 'styles', 'html', 'images']);
