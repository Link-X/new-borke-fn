import { useEffect, EffectCallback } from 'react'

const useEffectOnce = (effect: EffectCallback): void => {
    useEffect(effect, [])
}

const useMount = (fn: () => void): void => {
    useEffectOnce(() => {
        fn()
    })
}

export default useMount
