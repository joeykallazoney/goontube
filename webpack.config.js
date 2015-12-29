'use strict'
var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: ['./client.js'],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.sass$/, loader: 'style!css!sass?indentedSyntax' }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/static'
    }
}
