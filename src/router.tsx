import Index from '@/pages/index'
import PageNull from '@/pages/404'
import LoginPage from '@/pages/login/index'

// import loadable from '@utils/withLoadable'
// import Loading from '@/common/loading/index'

const files = require.context('./pages', true, /loadable\.tsx$/)

interface pathModuleType {
    path: string
    component: any
    routes?: pathModuleType[]
}
const pathModule: pathModuleType[] = []
files.keys().forEach((key) => {
    const pathArr = key.split('/')
    if (key.includes('childrens')) {
        const paranIndex = pathModule.findIndex((v) => v.path.includes(pathArr[1]))
        const childrenRoute = {
            path: `/${pathArr[1]}/${pathArr[3]}`,
            component: files(key).default
        }
        if (paranIndex !== -1) {
            pathModule[paranIndex].routes.push(childrenRoute)
        } else {
            pathModule.push({
                path: '/' + pathArr[1],
                component: {},
                routes: [childrenRoute]
            })
        }
        return
    }
    const currentIndex = pathModule.findIndex((v) => v.path.includes(pathArr[1]))
    if (currentIndex !== -1) {
        pathModule[currentIndex].component = files(key).default
    } else {
        pathModule.push({
            path: '/' + pathArr[1],
            component: files(key).default,
            routes: []
        })
    }
})

console.log(pathModule)

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
