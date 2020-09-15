/* eslint-disable */
/**
 * movementFactor移动距离
 * dampenFactor 移动速度
 */
const defaultOptions = {
    movementFactor: 50,
    dampenFactor: 36
}
export const setImageBackground = (el: any, options = {}) => {
    const base: any = {}
    base.width = el.getBoundingClientRect().width
    base.height = el.getBoundingClientRect().height
    base.el = el
    const centerCoordinates = { x: 0, y: 0 }
    const targetCoordinates = { x: 0, y: 0 }
    const transitionCoordinates = { x: 0, y: 0 }

    function getBackgroundImageUrl() {
        const styles = window.getComputedStyle(base.el)
        const backgroundImage = styles.backgroundImage.match(/url\(.*\)/gi)
        if (!backgroundImage || backgroundImage.length < 1) {
            throw 'No background image found'
        }
        return backgroundImage[0].replace(/url\(|'|"|'|"|\)$/gi, '')
    }

    function getBackgroundImageSize(cb) {
        const img = new Image()
        img.src = getBackgroundImageUrl()
        img.onload = function() {
            cb({ width: img.width, height: img.height })
        }
    }

    function setCenterCoordinates() {
        getBackgroundImageSize(function(bgImgSize: any) {
            centerCoordinates.x = (-1 * Math.abs(bgImgSize.width - base.width)) / 2
            centerCoordinates.y = (-1 * Math.abs(bgImgSize.height - base.height)) / 2
            targetCoordinates.x = centerCoordinates.x
            targetCoordinates.y = centerCoordinates.y
            transitionCoordinates.x = centerCoordinates.x
            transitionCoordinates.y = centerCoordinates.y
            moverDom()
        })
    }

    function bindEvents() {
        base.el.addEventListener('mousemove', function(e) {
            const width = base.options.movementFactor / base.width
            const height = base.options.movementFactor / base.height
            const cursorX = e.pageX - document.body.clientWidth / 2
            const cursorY = e.pageY - document.body.clientHeight / 2
            targetCoordinates.x = width * cursorX * -1 + centerCoordinates.x
            targetCoordinates.y = height * cursorY * -1 + centerCoordinates.y
            transitionCoordinates.x +=
                (targetCoordinates.x - transitionCoordinates.x) / base.options.dampenFactor
            transitionCoordinates.y +=
                (targetCoordinates.y - transitionCoordinates.y) / base.options.dampenFactor
            base.el.style.backgroundPosition =
                transitionCoordinates.x + 'px ' + transitionCoordinates.y + 'px'
            moverDom()
        })
        // var loop = setInterval(function(){
        // }, 16);
        window.addEventListener('resize', function() {
            setCenterCoordinates()
        })

        const img = new Image()
        img.src = getBackgroundImageUrl()
        img.onload = function() {
            setCenterCoordinates()
        }
    }
    function moverDom() {
        transitionCoordinates.x += (targetCoordinates.x - transitionCoordinates.x) / base.options.dampenFactor
        transitionCoordinates.y += (targetCoordinates.y - transitionCoordinates.y) / base.options.dampenFactor
        base.el.style.backgroundPosition = transitionCoordinates.x + 'px ' + transitionCoordinates.y + 'px'
    }
    base.init = function() {
        base.options = { ...defaultOptions, ...options }
        bindEvents()
    }

    base.init()
}
