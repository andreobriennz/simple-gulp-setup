const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');


import Compile from 'src/wrappers/Compile'


const settings = {
    src: 'app/src/assets',
    dest: 'app/dist/assets',
}


const compile = new Compile(settings);


// compile javascript //
compile.scripts([
    'assets/javascript/*.js',
    'assets/javascript/**/*.js',
])


// compile css //
compile.styles([
    'assets/styles/**/*.scss',
    'assets/styles/*.scss',
])


gulp.task('watch', function() {
    gulp.watch( compile.scripts, ['scripts']);
    gulp.watch( compile.styles, ['sass']);
});


gulp.task('default', ['sass', 'scripts', 'watch']);