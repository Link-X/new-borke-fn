import React, { useEffect } from 'react'

import { renderRoutes } from 'react-router-config'

import { propsRoute } from '@/typescript/index'
import { Location } from 'history'

import compose from '@/utils/compose'

type Iprops = propsRoute

type eachFunc = (e: Location<{}>, next: Function) => Promise<any>

const Index = (props: Iprops): JSX.Element => {
    const replacePage = (pathname: string) => {
        if (props.location.pathname === pathname) {
            return
        }
        props.history.replace({
            pathname
        })
    }

    const is404: eachFunc = async (e, next) => {
        const { routes } = props.route
        const isRouteNull = routes.some((v) => {
            return (
                v.path === e.pathname ||
                (v.routes &&
                    v.routes.length &&
                    v.routes.some((j) => {
                        return j.path === e.pathname
                    }))
            )
        })
        if (!isRouteNull && e.pathname !== '/') {
            replacePage('/404')
            return true
        }
        e.pathname !== '/404' && next()
    }

    const isLogin: eachFunc = async (e, next) => {
        const token = localStorage.getItem('_token')
        if (!token) {
            replacePage('/login')
            return
        }
        next()
    }

    const noGoLogin: eachFunc = async (e, next) => {
        const token = localStorage.getItem('_token')
        if (e.pathname === '/login' && token) {
            replacePage('/home')
            return
        }
        next()
    }

    const tickCheck = (arr: any[], e: Location<{}>) => {
        const fn = compose(arr)
        fn(e, () => {
            console.log('over')
        })
    }

    const routeEach = (): void => {
        const checkFunc = [is404, isLogin, noGoLogin]
        props.history.listen((e: Location<{}>): void => {
            tickCheck(checkFunc, e)
        })
        tickCheck(checkFunc, props.location)
    }

    useEffect(() => {
        console.log(props)
        routeEach()
    }, [])
    return <div className="index">{renderRoutes(props.route.routes)}</div>
}

export default Index
