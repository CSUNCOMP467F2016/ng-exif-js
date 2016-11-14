module.exports = function() {

    var base = './src/';
    var config = {
        base: base,
        index: base + 'index.html',
        // all js to vet
        alljs: ['./*.js', base + '**/*.js'],
        build: './build/',
        src: {
            js: base + '**/*.js',
            html: base + '**/*.html'
        },

        js: [
            base + '**/*.js',
            '!' + base + '**/*.spec.js'
        ],

        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        }

    }

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    }

    return config;
};
