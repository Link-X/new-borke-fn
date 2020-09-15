import { combineReducers, ReducersMapObject } from 'redux'

const files = require.context('.', false, /\.ts$/)
const modules: ReducersMapObject = {}

files.keys().forEach((key) => {
    if (key === './index.ts') return
    modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default
})

export default combineReducers(modules)
