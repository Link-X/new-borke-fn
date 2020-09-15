import { History } from 'history/index'
import { RouteComponentProps } from 'react-router'

export interface routeLocationType {
    hash: string
    pathname: string
    search: string
    state: any
}
export interface RouteConfig {
    key?: React.Key
    location?: Location
    component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType
    path?: string | string[]
    exact?: boolean
    strict?: boolean
    routes?: RouteConfig[]
    render?: (props: RouteConfigComponentProps<any>) => React.ReactNode
    [propName: string]: any
}

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}>
    extends RouteComponentProps<Params> {
    route?: RouteConfig
}
export interface routesType {
    path: string
    exact: boolean
    component: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType
    routes?: routesType[]
}

export interface routeType {
    component: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType
    path: string
    routes?: routesType[]
}

export interface propsRoute {
    history: History
    location: routeLocationType
    route: routeType
}
