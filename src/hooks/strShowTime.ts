/* eslint-disable */
import { useState, useEffect } from 'react'

const strShowTime = <T extends string>(
    str: string,
    wait: number
): [T, React.Dispatch<React.SetStateAction<string[]>>] => {
    const [strArr, setStrArr] = useState<string[]>(str.split(''))
    const [showStr, setShowStr] = useState<string>('')

    const init = () => {
        let time = 200
        let timeId: any = null

        /** 这里showStr 永远都是'' 我们缓存一个变量来保存它 */
        let str = showStr
        return function Loop() {
            timeId && clearTimeout(timeId)
            if (!strArr.length) {
                return
            }
            timeId = setTimeout(() => {
                setShowStr((str += strArr.shift()))
                Loop()
            }, (time -= 4))
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setShowStr('')
            const Loop = init()
            Loop()
        }, wait || 0)
    }, [str])

    return [showStr as T, setStrArr]
}

export default strShowTime
