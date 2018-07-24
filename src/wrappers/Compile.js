const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');


const example_settings = {
    src: 'src/assets',
    dest: 'dist/assets',
}


/**
 * Optional wrapper functions to compile Gulp more cleanly
 * @param {object.<string>} settings An object which defines settings:
 * namely, settings.src for source files directory, settings.dest for destination directory, 
 * and optionally settings.file_name for to name compiled file (defaults to app - eg app.js)
 * @constructor
 */
class Compile {
    constructor(settings) {
        this.settings = settings
        this.src = settings.src
        this.dest = settings.dest
        this.file_name = ( ( typeof settings.file_name ) !== 'undefined' ) ? settings.file_name : 'app'
    }


    scripts(files=[], settings=this.settings) {
        this.scripts = files

        gulp.task('scripts', function() {
            return gulp.src(files)
                .pipe(concat( settings.file_name+'.js' ))
                .pipe(babel())
                .pipe(gulp.dest( settings.dest ))
                .pipe(rename( settings.file_name+'.min.js' ))
                .pipe(uglify())
                .pipe(gulp.dest( settings.settings.dest ));
        });
    }


    styles(files=[], settings=this.settings) {
        this.styles = files
        
        gulp.task('sass', function () {
            return gulp.src( files )
                .pipe(sass().on('error', sass.logError))

                .pipe(concat( settings.file_name+scss_or_sass(files) )) // handle .sass and .scss
                .pipe(gulp.dest( settings.settings.dest ))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe(rename(settings.file_name+'.css'))
                .pipe(gulp.dest( settings.dest ))
                .pipe(rename(settings.file_name+'.min.css'))
                .pipe(minify({compatibility: 'ie8'}))
                .pipe(gulp.dest( settings.settings.dest ));
        });
    }


    scss_or_sass(files) {
        if (files[0].includes('.sass')) {
            return '.sass'
        }
        return '.scss'
    }
}


export default Compile