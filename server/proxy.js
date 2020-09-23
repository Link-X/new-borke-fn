const options = {
    target: 'http://39.108.184.64', // target host
    changeOrigin: true, // needed for virtual hosted sites
    // pathRewrite: {
    //     '^/api': '/api'
    // },
    context: '/api'
}

module.exports = options
