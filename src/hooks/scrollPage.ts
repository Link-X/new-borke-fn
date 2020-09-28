import { useState, useEffect, useRef } from 'react'

const ScrollPage = (ref: { current: HTMLDivElement }, max?: number) => {
    const [maxDom] = useState<number>(max || 2)
    const indexRef = useRef<number>(0)

    const upDom = (type: string) => {
        const count = type === 'up' ? -1 : 1
        indexRef.current += count
        ref.current.style.transform = `translate3d(0px, -${indexRef.current * 100}%,0px)`
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
    return ref
}

export default ScrollPage
