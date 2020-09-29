import { useState, useEffect, useRef } from 'react'

const ScrollPage = (ref: { current: HTMLDivElement }, max?: number): [number, HTMLDivElement] => {
    const [maxDom] = useState<number>(max || 2)
    const indexRef = useRef<number>(0)
    const [index, setIndex] = useState<number>(false)

    const upDom = (type: string) => {
        /** 重写触发使用组件的render */

        const count = type === 'up' ? -1 : 1
        const num =  indexRef.current += count
        setIndex(num)
        ref.current.style.transform = `translate3d(0px, -${num * 100}%,0px)`
    }

    const whellFunc = (ev: Event) => {
        const e = ev || window.event
        const index = indexRef.current
        if ((e.wheelDelta === 120 || e.detail === -3) && index > 0) {
            upDom('up')
        } else if ((e.wheelDelta === -120 || e.detail === 3) && index < maxDom - 1) {
            upDom('down')
        }
    }

    const scrollPage = () => {
        window.onmousewheel = whellFunc
        document.addEventListener('DOMMouseScroll', whellFunc, false)
    }

    useEffect(() => {
        scrollPage()
        return () => {
            window.onmousewheel = undefined
            document.removeEventListener('DOMMouseScroll', whellFunc)
        }
    }, [])
    return [index, ref.current]
}

export default ScrollPage
