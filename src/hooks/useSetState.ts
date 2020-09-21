import { useState, useCallback } from 'react'

const useSetState = <S extends object>(
    initState: S | (() => S)
): [S, (state: Partial<S> | ((state: S) => Partial<S>)) => void] => {
    const [_state, _setState] = useState<S>(initState)

    const updateState = useCallback((state: Partial<S> | ((state: S) => Partial<S>)) => {
        _setState((prevState: S) => {
            let nextState = state
            if (typeof state === 'function') {
                nextState = state(prevState)
            }
            return {
                ...prevState,
                ...nextState
            }
        })
    }, [])
    return [_state, updateState]
}

// function abc<T, U>(abc: T, bce: U): T & U {
//   const result = <T & U>{}
//   return result
// }

export default useSetState
