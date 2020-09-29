/* eslint-disable */

export const setBtnWater = (el, data = {}) => {
    // const duration = data.duration || 750
    const base = {
        el: '',
        duration: data.duration || 1500,
        type: data.type || 'agent',
        typeNodeName: data.typeNodeName
    }

    // 样式string拼凑
    const forStyle = function(position) {
        let cssStr = ''
        for (let key in position) {
            if (position.hasOwnProperty(key)) cssStr += key + ':' + position[key] + ';'
        }
        return cssStr
    }

    // 获取位置
    const forRect = function(target) {
        let position = {
                top: 0,
                left: 0
            },
            ele = document.documentElement
        'undefined' != typeof target.getBoundingClientRect && (position = target.getBoundingClientRect())
        // 页面上的位置=可视区域位置+页面滚动条切去高度-border高度
        return {
            top: position.top + window.pageYOffset - ele.clientTop,
            left: position.left + window.pageXOffset - ele.clientLeft
        }
    }

    const show = function(event) {
        const pDiv = event.target,
            cDiv = document.createElement('div')
        pDiv.appendChild(cDiv)
        const rectObj = forRect(pDiv),
            _height = event.pageY - rectObj.top,
            _left = event.pageX - rectObj.left,
            _scale = 'scale(' + (pDiv.clientWidth / 530) * 10 + ')'
        const position = {
            top: _height + 'px',
            left: _left + 'px'
        }
        ;(cDiv.className = cDiv.className + ' btn-animation'),
            cDiv.setAttribute('style', forStyle(position)),
            (position['transform'] = _scale),
            (position.transform = _scale),
            (position.opacity = '1'),
            (position['transition-duration'] = base.duration + 'ms'),
            (position['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)'),
            cDiv.setAttribute('style', forStyle(position))
        const finishStyle = {
            opacity: 0,
            'transition-duration': base.duration + 'ms',
            transform: _scale,
            top: _height + 'px',
            left: _left + 'px'
        }
        setTimeout(function() {
            cDiv.setAttribute('style', forStyle(finishStyle))
            setTimeout(function() {
                pDiv.removeChild(cDiv)
            }, base.duration)
        }, 100)
    }

    el.addEventListener('click', function(e) {
        if (
            base.type === 'agent' &&
            base.typeNodeName &&
            e.target.nodeName === base.typeNodeName.toLocaleUpperCase()
        ) {
            show(e)
        } else {
            show(e)
        }
    })
}
