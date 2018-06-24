# simple-gulp-setup

You do not have to clone this project, you can just copy the essential files and install everything as described below:

1. Copy gulpfile.babel.js and .babelrc to the project/theme directory
2. In gulpfile.babel.js, make settings.scripts equal an array of JS files and settings.styles equal an array of SASS/SCSS files to be compiled
3. Set up NPM by typing 'npm init' in the terminal and following the setup instructions (default settings are fine)
4. Install NPM and packages: npm install --save gulp gulp-concat gulp-uglify gulp-rename gulp-babel gulp-sass gulp-autoprefixer gulp-clean-css
5. Run 'gulp' in terminal, files should be created in the assets/dist folder

If you want to compile vendor files as a separate task, use the code from gulpfile.babel.extended.js

**Change log**
- 1.0.0-alpha.2: 
    - Breaking changes: files moved out of settings object and into files object. 
    - Since this is 'simple-gulp-setup', the setup to compile vendor files as a separate task is moved out of the default gulpfile.babel.js and into gulpfile.babel.extended.js, as explained above

**Issues**
- Sometimes issues compiling JavaScript vendor files from node_files when using vendor files via gulpfile.babel.extended.js
