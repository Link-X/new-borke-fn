import Index from '@/pages/index'
import PageNull from '@/pages/404'
import LoginPage from '@/pages/login/index'

const routes = [
    {
        component: Index,
        routes: [
            {
                path: '/a',
                exact: true,
                component: Index
            },
            {
                path: '/login',
                component: LoginPage
            },
            {
                path: '/404',
                component: PageNull
            }
        ]
    }
]

export default routes
