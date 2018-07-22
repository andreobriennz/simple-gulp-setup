const gulp = require('gulp');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');

const settings = {
    dest: 'assets/dist', // destination of compiled files
}

const files = {
    scripts: [ 
        // array of js files (* = all files. ** = all folders.):
        'assets/javascript/*.js',
        'assets/javascript/**/*.js',
    ],
    styles: [ 
        // array of sass files:
        'assets/styles/**/*.scss',
        'assets/styles/*.scss',
    ],
}

// JavaScript: concat files together, compile es2015 to es5, minify
gulp.task('scripts', function() {
    return gulp.src( files.scripts ) // array of files to be combined into app.js
        .pipe(concat( 'app.js' ))
        .pipe(babel()) // compile to ES5
        .pipe(gulp.dest( settings.dest ))
        .pipe(rename( 'app.min.js' ))
        .pipe(uglify()) // minify
        .pipe(gulp.dest( settings.dest ));
});


// CSS/SASS: compile scss to css, autoprefix, minify
gulp.task('sass', function () {
    return gulp.src( files.styles ) // array of sass files
        .pipe(sass().on('error', sass.logError))

        .pipe(concat( 'style.scss' )) // combine SCSS files together
        .pipe(gulp.dest( settings.dest ))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest( settings.dest ))
        .pipe(rename('style.min.css'))
        .pipe(minify({compatibility: 'ie8'}))
        .pipe(gulp.dest( settings.dest ));
});


gulp.task('watch', function() {
    gulp.watch( files.scripts, ['scripts']);
    gulp.watch( files.styles, ['sass']);
});


gulp.task('default', ['sass', 'scripts', 'watch']);