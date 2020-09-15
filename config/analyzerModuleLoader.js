const loaderUtils = require('loader-utils')

const dir = []
module.exports = function(source) {
    // const options = loaderUtils.getOptions(this)
    dir.push(this.resourcePath.slice(39))
    console.log(dir, dir.length)
    return source
}
