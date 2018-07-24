// handle running command like: node manage.js setup
const fs = require('fs')


class Setup {
    constructor(dest, settings) {
        this.dest = dest
        this.settings = settings
    }

    
    init() {
        const filename = 'src/gulp_templates/gulpfile.wrappers.js'

        const _self = this
        let data_promise = new Promise(function(resolve, reject) {
            _self.load_file(filename)
        });

        Promise.all([data_promise]).then(
            ((res) => {
                console.log('pass')
            }, (err) => {
                console.log('fail')
            })
        )
        
        return

        data = this.remove_comments(data)

        this.create_gulp_file(data)
    }


    load_file(filename) {
        fs.readFile(filename, 'utf8', function(err, data) {
            if (err) throw err; 
            console.log('OK: ' + filename);
            
            return data
        })

    }


    remove_comments(data) {
        if (!this.settings.includes('comments')) {
            console.log('remove comments')
        }
        return data
    }


    create_gulp_file (data) {
        fs.writeFile(this.dest+'/gulpfile.babel.js', data, function (err) {
            if (err) throw err;
        }); 
    }
}


const init = (dest, settings = 'none|wrappers') => {
    const setup = new Setup(dest, settings)

    setup.init()
}


// CLI
switch (process.argv[2]) { // first arg from terminal
    case 'init':
    case 'create':
        init(process.argv[3], process.argv[4]) // variations (eg comments or standard (no wrappers))
        break
    default:
        console.log('To init a new Gulp setup: "node manage.js create <folder>"')
        break
}
