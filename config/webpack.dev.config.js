const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

module.exports = webpackConfig({
    mode: 'development',
    entry: ['webpack-hot-middleware/client?name=mobile', path.join(__dirname, '../src/app.tsx')],
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, '../index.html')
        }),
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/, // exclude node_modules
            failOnError: false // show a warning when there is a circular dependency
        })
    ],
    devtool: 'cheap-module-eval-source-map',
    performance: {
        hints: false
    }
})
