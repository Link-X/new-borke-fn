const files = require.context('./pages', true, /loadable\.tsx$/)

interface pathModuleType {
    path: string
    component: any
    routes?: pathModuleType[]
}
const filesArr = files.keys()

const sortArr = (): string[] => {
    const left: string[] = []
    const right: string[] = []
    filesArr.forEach((v) => {
        if (v.includes('childrens')) {
            right.push(v)
        } else {
            left.push(v)
        }
    })
    return [...left, ...right]
}

const getRouters = () => {
    const pathModule: pathModuleType[] = []
    const list = sortArr()
    console.log(list)
    list.forEach((key) => {
        const pathArr = key.split('/')
        const path = pathArr[1] === 'index' ? '/' : `/${pathArr[1]}`

        if (key.includes('childrens')) {
            const currentIndex = pathModule.findIndex((v) => v.path.includes(pathArr[1]))
            const childrenRoute = {
                path: `/${pathArr[1]}/${pathArr[3]}`,
                component: files(key).default
            }
            pathModule[currentIndex].routes.push(childrenRoute)
            return
        }
        pathModule.push({
            path,
            component: files(key).default,
            routes: []
        })
    })
    return pathModule
}

const routers: pathModuleType[] = getRouters()

console.log(routers)

export default routers
