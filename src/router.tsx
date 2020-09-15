import Index from '@/pages/index'

const routes = [
    {
        component: Index,
        routes: [
            {
                path: '/a',
                exact: true,
                component: Index
            }
        ]
    }
]

export default routes
