import Home from '@/pages/home/'

const routes = [
    {
        component: Home,
        routes: [
            {
                path: '/a',
                exact: true,
                component: Home
            }
        ]
    }
]

export default routes
