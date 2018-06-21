# simple-gulp-setup

You do not have to clone this project, you can just copy the essential files and install everything as described below:

1. Copy gulpfile.babel.js and .babelrc to the project/theme directory
2. In gulpfile.babel.js, make settings.scripts equal an array of JS files and settings.styles equal an array of SASS/SCSS files to be compiled
3. Set up NPM by typing 'npm init' in the terminal and following the setup instructions (default settings are fine)
4. Install NPM and packages: npm install --save gulp gulp-concat gulp-uglify gulp-rename gulp-babel gulp-sass gulp-autoprefixer gulp-clean-css gulp-concat
5. Run 'gulp' in terminal, files should be created in the assets/dist folder

Issues:
- Sometimes issues compiling JavaScript vendor files in node_files
- Doesn't include SASS from all files in array 
