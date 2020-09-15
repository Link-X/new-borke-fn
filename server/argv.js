// process.argv 第一个元素是node路径，第二个元素是文件路径
module.exports = require('minimist')(process.argv.slice(2))
