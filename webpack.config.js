'use strict'

var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer')

module.exports = {
    entry: [
        './client/index.js',
        './client/styles/style.sass'
    ],
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.sass$/, loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!sass?indentedSyntax') }
        ]
    },
    node: {
        console: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        console: true
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/static'
    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    plugins: [
        new ExtractTextPlugin('style.css'),
        //to minify for production: new webpack.optimize.UglifyJsPlugin({compress: true})
    ]
}
