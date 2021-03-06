/** 这样路由其实有很多问题，比如修改路径名的时候需要把文件名也修改一些。
 * but 问题不大, 假设是一个大型项目有多个子项目合成过来。这种方式就非常有用啦 */

import produce from 'immer'

const files = require.context('./pages', true, /loadable\.tsx$/)

interface pathModuleType {
    path?: string
    component: any
    routes?: pathModuleType[]
}
const filesArr = files.keys().sort((a, b) => a.indexOf('childrens') - b.indexOf('childrens'))

const getRouters = (): pathModuleType[] => {
    let pathModule: pathModuleType[] = []
    filesArr.forEach((key) => {
        const pathArr = key.split('/')
        const path = `/${pathArr[1]}`
        if (path === '/index') {
            return
        }
        if (key.includes('childrens')) {
            const currentIndex = pathModule.findIndex((v) => v.path.includes(pathArr[1]))
            const childrenRoute = {
                path: `/${pathArr[1]}/${pathArr[3]}`,
                component: files(key).default
            }
            pathModule = produce(pathModule, (draft) => {
                draft[currentIndex].routes.push(childrenRoute)
            })
            return
        }
        pathModule = produce(pathModule, (draft) => {
            draft.push({
                path,
                component: files(key).default,
                routes: []
            })
        })
    })
    return [
        {
            component: files('./index/loadable.tsx').default,
            routes: pathModule
        }
    ]
}

const routers: pathModuleType[] = getRouters()

console.log(routers)

export default routers
