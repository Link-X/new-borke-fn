const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ChunkRenamePlugin = require('webpack-chunk-rename-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackConfig = require('./webpack.config')

module.exports = webpackConfig({
    mode: 'production',
    entry: {
        app: path.join(process.cwd(), 'src/app.tsx')
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        publicPath: '/'
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true
                    }
                }
            }),
            new TerserPlugin({
                // 6984ms 1508ms 1502ms
                cache: true,
                sourceMap: true, // Must be set to true if using source-maps in production
                parallel: true,
                extractComments: false
            })
        ],
        runtimeChunk: {
            name: 'runtime'
        },
        moduleIds: 'hashed',
        chunkIds: 'named',
        nodeEnv: 'production',
        sideEffects: true,
        concatenateModules: true,
        splitChunks: {
            // 现在对整个异步加载的chunk的都做了优化,只要父模块加载过的模块，异步加载的模块都不会从新被计算进去
            chunks: 'all',
            minSize: 0,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.(css|less)$/,
                    chunks: 'all',
                    enforce: true
                },
                'async-common': {
                    chunks: 'async',
                    minChunks: 2,
                    reuseExistingChunk: true
                },
                'nest-vendor': {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                    name: 'nest-vendor'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    name: 'base-common'
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css'
        }),
        new ChunkRenamePlugin({
            // runtimeChunk有值之后，entry的filename不会变成chunkFilename
            initialChunksWithEntry: true
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, '../index.html'),
            minification: true
        })
        // new CompressionPlugin({
        //     algorithm: 'gzip',
        //     test: /\.js$|\.css$|\.html$/,
        //     threshold: 10240,
        //     minRatio: 0.8,
        // })
    ],
    performance: {
        assetFilter: (assetFilename) => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)
    },
    devtool: 'source-map'
})
