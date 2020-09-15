const isAbsoluteUrl = require('is-absolute-url')
const open = require('opn')

function runOpen(url = '/', options = {}, log = console.log) {
    let openOptions = {
        wait: false
    }

    let openOptionValue = ''

    if (typeof options.open === 'string') {
        openOptions = Object.assign({}, openOptions, { app: options.open })
        openOptionValue = `: "${options.open}"`
    }

    const pages = typeof options.openPage === 'string' ? [options.openPage] : options.openPage || []

    return Promise.all(
        pages.map((page) => {
            const pageUrl = page && isAbsoluteUrl(page) ? page : `${url}${page}`
            console.log('pageUrl', pageUrl)
            return open(pageUrl, openOptions).catch(() => {
                log(`不能打开 "${pageUrl}" 在${openOptionValue}浏览器内`)
            })
        })
    )
}

module.exports = runOpen
