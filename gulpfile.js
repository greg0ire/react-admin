'use strict';

var gulp    = require('gulp');
var del     = require('del');
var browserify = require('browserify');
var webserver = require('gulp-webserver');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var babelify = require("babelify");
var less = require('gulp-less');
var rename = require('gulp-rename');
var babel  = require("gulp-babel");
var plumber = require('gulp-plumber');
var concat  = require('gulp-concat');
var replace = require('gulp-regex-replace');
var stripDebug = require('gulp-strip-debug');
var sourcemaps = require('gulp-sourcemaps');
var derequire = require('gulp-derequire');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var debug = require('gulp-debug');
var watch = require('gulp-watch');
var sequence = require('gulp-watch-sequence');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var runSequence = require('run-sequence');
var styledocco = require('gulp-styledocco');
var marked = require('gulp-marked');
var uglify = require('gulp-uglify');


gulp.task('default', function(cb) {
    return runSequence('lib', 'npm', 'demo', 'doc', cb);
});

/**
 * Tasks for building the main library
 **/
gulp.task('lib.clean', function(cb) {
    return del('./dist/react-admin', cb);
});

gulp.task('lib.transpile.clean', function(cb) {
    return del('./dist/react-admin/*/*.js', cb);
});

gulp.task('lib.transpile', [ 'lib.transpile.clean' ], function() {
    return gulp.src(['./react-admin/**/*.js', './react-admin/**/*.jsx'])
        .pipe(plumber())
        .pipe(babel({}))
        .pipe(replace({regex: "\\.jsx", replace: ''}))
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest('./dist/react-admin'));
});

gulp.task('lib.theme.clean', function(cb){
    return del('./dist/react-admin/themes/*', cb);
});

gulp.task('lib.theme.prepare', [ 'lib.theme.clean' ], function() {
    return gulp.src('./themes/**/*.scss')
        .pipe(gulp.dest('./dist/react-admin/themes'));
});

gulp.task('lib.theme', ['lib.theme.prepare'], function () {
    return gulp.src('./dist/react-admin/themes/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/react-admin/themes/css'));
});

gulp.task('lib', ['lib.transpile', 'lib.theme'], function(cb) {
    return del([
        "./dist/react-admin/__tests__",
        "./dist/react-admin/*/__tests__",
        "./dist/react-admin/__mocks__",
        "./dist/react-admin/*/__mocks__"
    ], cb);
});

/**
 * Tasks for making the react-admin module available in the current scope
 **/
gulp.task('npm.clean', function(cb) {
    return del("./node_module/react-admin", cb)
});

gulp.task('npm.prepare', ['npm.clean'], function() {
    return gulp.src(['./package.json', './dist/react-admin/**/*'], { base: './' })
        .pipe(gulp.dest('./node_modules/react-admin'));
});

gulp.task('npm', ['npm.prepare'], function () {
    return gulp.src(['./node_modules/superagent/**/*'], { base: './' })
        .pipe(gulp.dest('./node_modules/react-admin/node_modules'));
});

/**
 * Tasks for building the current demo
 **/
gulp.task('demo.fonts', ['demo.clean.fonts'], function() { 
    return gulp.src([
        './bower_components/bootstrap-sass/assets/fonts/bootstrap/**.*',
        './bower_components/fontawesome/fonts/**.*'
    ]) 
    .pipe(gulp.dest('./dist/demo/fonts')); 
});

gulp.task('demo.styles', ['demo.clean.styles'], function() {
    return gulp.src("./demo/styles/main.scss")
        .pipe(changed("main.css"))
        .pipe(sass({errLogToConsole: true}))
        .on('error', notify.onError())
        .pipe(autoprefixer('last 1 version'))
        //.pipe(csso())
        .pipe(gulp.dest('./dist/demo/css'))
        .pipe(reload({stream: true}));
});

gulp.task('demo.html', ['demo.clean.html'], function() {
    return gulp.src('./demo/index.html').pipe(gulp.dest('./dist/demo'));
});

gulp.task('demo.clean.html', function(cb) {
    return del('./dist/demo/index.html', cb);
});

gulp.task('demo.clean.styles', function(cb) {
    return del('./dist/demo/css', cb);
});

gulp.task('demo.clean.fonts', function(cb) {
    return del('./dist/demo/fonts', cb);
});

gulp.task('demo.clean.js', function(cb) {
    return del('./dist/demo/js', cb);
});

gulp.task('demo.clean', ['demo.clean.js', 'demo.clean.fonts', 'demo.clean.css'], function() {
    return del('./dist/demo', cb);
});

gulp.task('demo.js', ['demo.clean.js'], function(cb) {
    return browserify("./demo/app.jsx", {
          basedir: __dirname,
          debug: true,
          paths: ['./node_modules', './demo'],
          fullPaths: false
        })
        .transform(babelify)
        .bundle()
        .on("error", function (err) { console.log("Error: " + err.message); })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/demo/js"));
});

gulp.task('demo', [
    'demo.html',
    'demo.js',
    'demo.styles',
    'demo.fonts'
]);

gulp.task('doc.styles.clean', function(cb) {
    return del('./dist/docs/themes/**/*.html', cb);
});

gulp.task('doc.styles', ['lib.theme'], function () {
    return gulp.src('./dist/react-admin/themes/css/**/*.css')
        .pipe(styledocco({
            out: './dist/docs/themes',
            name: 'React Admin Documentation',
            'no-minify': true
        }));
});

gulp.task('doc.html.clean', function(cb) {
    return del('./dist/docs/react-admin/**/*.html', cb);
});

gulp.task('doc.html', ['doc.html.clean'], function() {
    return gulp.src('./docs/**/*.md')
        .pipe(marked({
            // optional : marked options
        }))
        .pipe(gulp.dest('./dist/docs/react-admin'))
});

gulp.task('doc', ['doc.html', 'doc.styles']);

gulp.task('watch', function () {
    var watcher = gulp.watch("./react-admin/*/*.jsx", ['default']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    return watcher;
});