var webpack = require('webpack')

module.exports = {
    entry: ['./client.js'],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
        ]
    },
    output: {
        filename: 'bundle.js',
        type: 'text/javascript'
    }
}
