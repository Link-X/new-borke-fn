module.exports = ({ file, env }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {},
        cssnano: env === 'production' ? {} : false
    }
})
