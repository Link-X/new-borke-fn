import 'core-js/features/set'
import 'core-js/features/map'
import 'core-js/features/promise'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Root from './root'
import 'antd/dist/antd.css'
import '@/global/reset.less'
import '@/global/global.less'
import 'iu-toast/dist/iu-toast.min.css'
import configureStore from './configureStore'

import webrecord from 'web-front-end-record'
console.log(webrecord)

const store = configureStore()
const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/">
            <Root />
        </BrowserRouter>
    </Provider>,
    MOUNT_NODE
)
