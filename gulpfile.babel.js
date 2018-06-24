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
        // array of js files
        'assets/javascript/file1.js',
        'assets/javascript/file2.js',
        // or just: assets/javascript/*.js' for all in that folder
    ],
    styles: [ 
        // array of sass files to compile, 
        // you *might* need to list files in order rather than using * for alphabetical order
        'assets/styles/file1.scss',
        'assets/styles/file2.scss',
        // 'assets/styles/**/*.scss',
        // 'assets/styles/*.scss',
    ],
}

// JAVASCRIPT: concat together, compile es2015, minify
gulp.task('scripts', function() {
    return gulp.src( files.scripts ) // array of files
        .pipe(concat( 'app.js' )) // concatinate files as app.js
        .pipe(babel()) // compile to ES5 (older JS version)
        .pipe(gulp.dest( settings.dest )) // create app.js in dist folder
        .pipe(rename( 'app.min.js' )) // name of minified version 
        .pipe(uglify()) // actually minify it
        .pipe(gulp.dest( settings.dest )); // create app.min.js
});


// CSS/SASS: compile scss to css, autoprefix, minify
gulp.task('sass', function () {
    return gulp.src( files.styles ) // array of sass files
        .pipe(sass().on('error', sass.logError))

        .pipe(concat( 'style.scss' )) // combine SCSS files together
        .pipe(gulp.dest( settings.dest ))
        .pipe(autoprefixer({ // auto-prefix for better browser support 
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename('style.css')) // name of compiled file
        .pipe(gulp.dest( settings.dest )) // create compiled file
        .pipe(rename('style.min.css')) // name of minified file
        .pipe(minify({compatibility: 'ie8'})) // minify file
        .pipe(gulp.dest( settings.dest )); // create the minified file
});


// WATCH FOR CHANGES
gulp.task('watch', function() {
    gulp.watch( files.scripts, ['scripts']);
    gulp.watch( files.styles, ['sass']);
});


gulp.task('default', ['sass', 'scripts', 'watch']);