import { useEffect, useRef } from 'react'

const useInterval = (callback: Function, delay?: number | null): void => {
    const savedCallback = useRef<Function>((): void => {})

    useEffect(() => {
        savedCallback.current = callback
    })

    useEffect(() => {
        if (delay !== null) {
            const interval = setInterval(() => savedCallback.current(), delay || 0)
            return () => clearInterval(interval)
        }

        return undefined
    }, [delay])
}

export default useInterval
