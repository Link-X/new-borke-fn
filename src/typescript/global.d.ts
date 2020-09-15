import { History } from 'history/index'

export interface routeLocationType {
    hash: string
    pathname: string
    search: string
    state: any
}

export interface routeType {
    component: React.Component
    path: string
}

export interface propsRoute {
    history: History
    location: routeLocationType
    route: routeType
}
