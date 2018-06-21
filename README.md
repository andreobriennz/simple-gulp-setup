# simple-gulp-setup

You do not have to clone this project, you can just copy the essential files and install everything as described below:

1. Requires gulpfile.babel.js to use gulp and babel, and .babelrc to use babel for ES2015
2. Make sure settings.scripts and settings.styles (in gulpfile.babel.js) points is an array of file/s in your project
3. Set up NPM: npm init
4. follow instructions (default is file)
5. Install NPM: npm install
6. Install packages: npm install --save gulp gulp-concat gulp-uglify gulp-rename gulp-babel gulp-sass gulp-autoprefixer gulp-clean-css
7. Run 'gulp' in terminal, files should be creasted in assets/dist folder

Issues:
- Sometimes issues compiling JavaScript vendor files from node_files