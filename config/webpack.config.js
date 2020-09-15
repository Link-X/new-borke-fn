const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const argv = require('../server/argv')
const isProd = process.env.NODE_ENV === 'production'

const smp = new SpeedMeasurePlugin()
const resolve = (dir) => path.join(__dirname, '../', dir)

const COMMON_PLUGINS = [
    new webpack.EnvironmentPlugin({
        NODE_ENV: 'development'
    }),
    new webpack.ProgressPlugin({
        entries: true,
        modules: true,
        modulesCount: 100,
        profile: true
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: resolve('src/assets'),
                to: './'
            }
        ],
        options: {
            concurrency: 100
        }
    })
]

if (argv.analyzer) {
    COMMON_PLUGINS.push(
        new BundleAnalyzerPlugin({
            analyzerPort: parseInt(argv.port || 9528, 10)
        })
    )
}

const styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader'

const smpWrap = argv.analyzer ? smp.wrap : (config) => config

const cacheLoader = {
    loader: 'cache-loader',
    options: {
        cacheDirectory: path.resolve('./node_modules/.cache/cache-loader')
    }
}

module.exports = (webpackOptions) =>
    smpWrap({
        mode: webpackOptions.mode,
        entry: webpackOptions.entry,
        output: {
            path: resolve('dist'),
            filename: '[name].js',
            ...webpackOptions.output
        },
        optimization: webpackOptions.optimization,
        module: {
            rules: [
                {
                    test: /.(j|t)s(x)?$/,
                    exclude: /(node_modules\/(?!(fbjs|scheduler|axios)\/)|bower_components)/,
                    include: [
                        resolve('src'),
                        resolve('node_modules/fbjs'),
                        resolve('node_modules/scheduler'),
                        resolve('node_modules/axios')
                    ],
                    use: [
                        cacheLoader,
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                configFile: resolve('.babelrc')
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    include: [resolve('src')],
                    exclude: /(node_module|\.module.css$)/,
                    use: [cacheLoader, styleLoader, 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.module\.css$/,
                    include: [resolve('src')],
                    exclude: /node_module/,
                    use: [
                        cacheLoader,
                        styleLoader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1
                            }
                        },
                        'postcss-loader'
                    ]
                },
                {
                    test: /.less$/,
                    // include: [resolve('src')],
                    // exclude: /node_modules/,
                    use: [
                        cacheLoader,
                        // Loaders are evaluated/executed from right to left (or from bottom to top)
                        styleLoader,
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: {
                                    'primary-color': '#F65C2D'
                                },
                                javascriptEnabled: true
                            }
                        }
                    ]
                },
                {
                    test: /.css$/,
                    include: /node_module/,
                    use: [styleLoader, 'css-loader']
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
                    use: 'file-loader'
                },
                {
                    test: /.svg$/,
                    use: [
                        {
                            loader: 'svg-url-loader',
                            options: {
                                limit: 10 * 1024,
                                noquotes: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|jpeg)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.(mp4|webm)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                }
            ]
        },
        plugins: webpackOptions.plugins.concat(COMMON_PLUGINS),
        resolve: {
            modules: [resolve('src'), 'node_modules'],
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.react.js'],
            mainFields: ['main', 'jsnext:main'],
            alias: {
                'react-dom': '@hot-loader/react-dom',
                '@': resolve('src'),
                '@components': resolve('src/components'),
                '@utils': resolve('src/utils'),
                '@assets': resolve('src/assets')
            }
        },
        devtool: webpackOptions.devtool,
        target: 'web',
        performance: webpackOptions.performance || {}
    })
