'use strict'

var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: ['./src/client.js', './sass/style.sass'],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
            // If you're wondering why the line below is here, so am I!
            // npm-module youtube-node's subdependencies were
            // throwing errors with webpack for some reason.
            // "screendriver"'s post here was the only thing
            // that worked. Something something webpack needs help with json.
            // https://github.com/request/request/issues/1529
            //
            // I don't care.
            // Thing works.
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.sass$/, loader: ExtractTextPlugin.extract('style', 'css!sass?indentedSyntax') }
        ]
    },
    node: {
      console: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/static'
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        //to minify for production: new webpack.optimize.UglifyJsPlugin({compress: true})
    ]
}
