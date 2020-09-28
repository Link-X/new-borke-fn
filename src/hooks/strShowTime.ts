/* eslint-disable */
import { useState, useEffect } from 'react'

interface strSHowTimeData {
    showStr: string
    strStatus: string
    strB: string
}

const strShowTime = (
    str: string,
    wait: number
): [strSHowTimeData, React.Dispatch<React.SetStateAction<string[]>>] => {
    const [strArr, setStrArr] = useState<string[]>(str.split(''))
    const [showStr, setShowStr] = useState<string>('')
    const [strStatus, setStrStatus] = useState<string>('start')
    const [strB, setStrB] = useState<string>('')

    const strClassTran = () => {
        let classStr = ''
        const timeId = setInterval(() => {
            setStrB((classStr = classStr ? '' : 'tip-opacity'))
        }, 500)
        return timeId
    }

    const strPerform = () => {
        let time = 300
        let timeId: any = null

        /** 这里showStr 永远都是'' 我们缓存一个变量来保存它 */
        let str = showStr
        return function Loop() {
            timeId && clearTimeout(timeId)
            if (!strArr.length) {
                setStrStatus('end')
                setStrB('tip-opacity')
                return
            }
            timeId = setTimeout(() => {
                setShowStr((str += strArr.shift()))
                Loop()
            }, (time -= 4))
        }
    }

    useEffect(() => {
        const timeId = strClassTran()
        setTimeout(() => {
            clearInterval(timeId)
            setShowStr('')
            setStrB('')
            const Loop = strPerform()
            Loop()
        }, wait || 0)
    }, [str])

    return [{ showStr, strStatus, strB }, setStrArr]
}

export default strShowTime
