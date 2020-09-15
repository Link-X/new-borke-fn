import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'

const middlewares = [promiseMiddleware]

const enhancer = compose(applyMiddleware(...middlewares))

export default function configStore(): any {
    const store = createStore(rootReducer, enhancer)
    return store
}
