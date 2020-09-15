import 'core-js/features/set'
import 'core-js/features/map'
import 'core-js/features/promise'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import Root from './root'
import '@/global/reset.less'
import configureStore from './configureStore'

const store = configureStore()
const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
    <Provider store={store}>
        <HashRouter basename="/">
            <Root />
        </HashRouter>
    </Provider>,
    MOUNT_NODE
)
