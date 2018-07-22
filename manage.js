// handle running command like: node manage.js setup
const fs = require('fs')


// SETUP
class Setup {
    constructor() {

    }

    create_with_comments() {

    }

    create_without_comments() {

    }
}


// UPDATES
class Update {
    constructor() {
        
    }

    copy(input, output) {
        fs.createReadStream(input).pipe(fs.createWriteStream(output))
    }

    run_updates() {
        // add error checking
        this.copy('src/.babelrc', 'dist/.babelrc')
        this.copy('src/gulpfile.babel.js', 'dist/gulpfile.babel.js')
        this.copy('src/wrappers/wrappers.js', 'dist/wrappers/wrappers.js')
        console.log('Updated into dist/')
    }
}
const update = new Update()


const run_updates = () => {
    update.run_updates()
}
run_updates()


module.exports.run_updates = function() {
    console.log('(update imported)')
}