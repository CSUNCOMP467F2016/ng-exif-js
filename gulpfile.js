'use strict';
var config = require('./gulp.config.js')();
var args = require('yargs').argv;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var browserSync = require('browser-sync').create();


gulp.task('default', ['wiredep', 'watch', 'jshint', 'serve'], function() {
    return log('task: default is running');
});


gulp.task('vet', function() {
    log('task: vet is running');
    return gulp.src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('js',['jshint'], function() {
    log('task: js is running');
    return gulp.src(config.src.js, {base: config.base})
       .pipe($.concat('all.js'))
       .pipe($.uglify())
       .pipe(gulp.dest(config.build));
});

// watch files for changes and reload
gulp.task('serve', ['wiredep', 'watch'], function() {
    log('task: serve is running');
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: config.base,
            index: "index.html",
            routes: {
                "/node_modules": "./node_modules",
                "/bower_components": "./bower_components"

            }
        }
    });
    gulp.watch([config.src.html, config.src.js]).on('change', browserSync.reload);
});


gulp.task('minify', ['jshint'], function() {
    log('task: minify is running');
    return gulp.src(config.src.js, {base: config.base})
        // This will output the non-minified version
        .pipe(gulp.dest(config.build))
        .pipe($.concat('all.js'))
        // This will minify and rename to foo.min.js
        .pipe($.uglify())
        .pipe($.rename({ extname: '.min.js' }))
        .pipe(gulp.dest(config.build));
});


// configure the jshint task
gulp.task('jshint', function() {
    log('task: jshint is running');
    return gulp.src(config.src.js)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    log('task: watch is running');
    gulp.watch(config.src.js, ['jshint']);
});


gulp.task('wiredep', function(){
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp.src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.src.js), { relative: true }))
        .pipe(gulp.dest(config.base));
});


/////////////////

function log(msg) {
    if(typeof(msg) === 'object') {
        for (var item in msg) {
            if(msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}