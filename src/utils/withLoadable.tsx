import React, { lazy, Suspense, useCallback } from 'react'

const loadable = (importFunc: any, options: { fallback: JSX.Element }): object => {
    const Temp = (props: object): JSX.Element => {
        const LazyComponent = useCallback(lazy(importFunc), [])
        const { fallback } = options
        return (
            <Suspense fallback={fallback}>
                <LazyComponent {...props} />
            </Suspense>
        )
    }
    return Temp
}

export default loadable
