var gulp = require('gulp'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    html2js = require('gulp-html2js'),
    del = require('del'),
    runSequence = require('run-sequence'),
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync').create();

var paths = {
    script : {
        src: 'src/**/*.js',
        output: 'app.js'
    },
    dependencies: {
        src : [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js',
            'node_modules/angular-translate/dist/angular-translate.min.js'
        ],
        output: 'dependencies.js'
    },
    style : {
        src : 'src/**/*.scss',
        main : 'src/main.scss',
        output : 'app.css'
    },
    template : {
        src : 'src/**/*.jade',
        output : 'templates.js'
    },
    assets : {
        src : 'assets/**/*'
    },
    index : 'src/index.html',
    dist : 'dist',
    bundle : {
        src : [
            'dist/dependencies.js',
            'dist/app.js',
            'dist/templates.js'
        ],
        output :'bundle.js'
    }
};

var templatesModuleName = 'weatherApp.templates';



/* CLEAN */

gulp.task('clean', function() {
    return del(paths.dist);
});

/* BUILD APP WITH TEMPLATES */

gulp.task('build-sources', function() {
    return gulp.src(paths.script.src)
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat(paths.script.output))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build-dependencies', function() {
    return gulp.src(paths.dependencies.src)
        .pipe(concat(paths.dependencies.output))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build-templates', function(){
    return gulp.src(paths.template.src)
        .pipe(jade())
        .pipe(html2js({
            outputModuleName: templatesModuleName,
            useStrict: true
        }))
        .pipe(concat(paths.template.output))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build-bundle', function(){
    return gulp.src(paths.bundle.src)
        .pipe(concat(paths.bundle.output))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream());
});

gulp.task('build', function(callback) {
    runSequence(
        ['build-sources', 'build-dependencies', 'build-templates'],
        'build-bundle',
        callback
    );
});

/* STYLE */

gulp.task('style', function() {
    return gulp.src(paths.style.main)
        .pipe(plumber())
        .pipe(sass().on('error', gutil.log))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(minifyCSS({
            processImport: false
        }))
        .pipe(rename(paths.style.output))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.stream());
});

/* COPY INDEX AND RESOURCES */

gulp.task('copy', function() {
    gulp.src(paths.index)
        .pipe(gulp.dest(paths.dist));

    return gulp.src(paths.assets.src)
        .pipe(gulp.dest(paths.dist));
});

/* BROWSER-SYNC */

gulp.task('browserSync', function() {
    return browserSync.init({
        server: {
            baseDir: paths.dist
        }
    })
});



/* TASKS */

// Package task

gulp.task('package', function(){
    runSequence(
        'clean',
        ['build', 'copy', 'style']
    );
});

// Dev task

gulp.task('dev', ['browserSync', 'package'], function(){

    gulp.watch(paths.assets.src, ['copy']);

    gulp.watch(paths.style.src, ['style']);

    gulp.watch(paths.script.src, function(){
        runSequence(
            'build-sources',
            'build-bundle'
        );
    });

    gulp.watch(paths.template.src, function(){
        runSequence(
            'build-templates',
            'build-bundle'
        );
    });
});

// Default task

gulp.task('default', ['package']);
