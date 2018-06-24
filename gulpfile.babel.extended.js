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
    vendor: { // optional array for vendor files
        scripts: [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
        ],
        styles: [
            './node_modules/bootstrap/dist/css/bootstrap.css',
        ],
    },
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


// VENDOR (same as scripts and sass tasks, but with different files and destination)
// javascript
gulp.task('vendor-scripts', function() {
    return gulp.src( files.vendor.scripts )
        .pipe(concat('vendor.js'))
        .pipe(babel())
        .pipe(gulp.dest( settings.dest ))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest( settings.dest ));
});

// css/sass
gulp.task('vendor-sass', function () {
    return gulp.src( files.vendor.styles )
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename( 'vendor.css' ))
        .pipe(gulp.dest( settings.dest ))
        .pipe(rename( 'vendor.min.css' ))
        .pipe(minify({compatibility: 'ie8'}))
        .pipe(gulp.dest( settings.dest ));
});


gulp.task('watch', function() {
    gulp.watch( files.scripts, ['scripts']);
    gulp.watch( files.styles, ['sass']);
});

gulp.task('default', ['sass', 'scripts', 'watch']);
gulp.task('vendor', ['vendor-sass', 'vendor-scripts']);