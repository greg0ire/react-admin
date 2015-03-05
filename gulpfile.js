'use strict';
var gulp    = require('gulp')
  , del     = require('del')
  , browserify = require('browserify')
  , reactify = require('reactify')
  , webserver = require('gulp-webserver')

  , browserSync = require('browser-sync')
  , reload = browserSync.reload

  , less = require('gulp-less')
  , rename = require('gulp-rename')
  , toFive  = require("gulp-6to5")
  , plumber = require('gulp-plumber')
  , concat  = require('gulp-concat')
  , replace = require('gulp-regex-replace')
  , stripDebug = require('gulp-strip-debug')
  , sourcemaps = require('gulp-sourcemaps')
  , derequire = require('gulp-derequire')
  , changed = require('gulp-changed')
  , sass = require('gulp-sass')
  , csso = require('gulp-csso')
  , autoprefixer = require('gulp-autoprefixer')
  , notify = require('gulp-notify')

  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer')
  , transform = require('vinyl-transform')
  ;

gulp.task('build.clean', function(cb){
    return del('./lib', cb);
})

gulp.task('build.compile', [ 'build.clean' ], function(){
    return gulp.src(['./src/**/*.js', './src/**/*.jsx'])
        .pipe(plumber())
        .pipe(toFive({}))
        .pipe(replace({regex: "\\.jsx", replace: ''}))
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest('./lib'));
})

gulp.task('build', ['build.compile'], function() {
    return del([
        "./lib/__tests__",
        "./lib/*/__tests__",
        "./lib/__mocks__",
        "./lib/*/__mocks__"
    ])
})

gulp.task('demo.fonts', ['demo.clean.fonts'], function() { 
    return gulp.src([
            './bower_components/bootstrap-sass/assets/fonts/bootstrap/**.*',
            './bower_components/fontawesome/fonts/**.*'
        ]) 
        .pipe(gulp.dest('./demo/dist/fonts')); 
});

gulp.task('demo.styles', ['demo.clean.styles'], function() {
  return gulp.src("./demo/src/styles/main.scss")
    .pipe(changed("main.css"))
    .pipe(sass({errLogToConsole: true}))
    .on('error', notify.onError())
    .pipe(autoprefixer('last 1 version'))
    //.pipe(csso())
    .pipe(gulp.dest('./demo/dist/css'))
    .pipe(reload({stream: true}));
});

gulp.task('demo.html', ['demo.clean.html'], function() {
  return gulp.src('demo/src/index.html').pipe(gulp.dest('demo/dist'));
});

gulp.task('demo.clean.html', function(cb) {
    return del('./demo/dist/index.html', cb);
})

gulp.task('demo.clean.styles', function(cb) {
    return del('./demo/dist/css', cb);
})

gulp.task('demo.clean.fonts', function(cb) {
    return del('./demo/dist/fonts', cb);
})

gulp.task('demo.clean.js', function(cb) {
    return del('./demo/dist/js', cb);
})

gulp.task('demo.clean', ['demo.clean.js', 'demo.clean.fonts', 'demo.clean.css'], function() {
    return del('./demo/dist', cb);
});

gulp.task('demo.js', ['build', 'demo.clean.js'], function(cb) {
    return browserify("./demo/src/app.jsx", {
          basedir: __dirname,
          debug: true,
          paths: ['./node_modules', './demo/src']
        })
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest("demo/dist/js"));
    }
)

gulp.task('demo', [
    'demo.html',
    'demo.js',
    'demo.styles',
    'demo.fonts'
]);

gulp.task('demo.server', function() {
  return gulp.src('./demo/dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: {
        enable: true,
        path: './demo/dist'
      },
      open: true,
      host: "0.0.0.0",
      port: 9999
    }));
});