import React from 'react'
import loadable from '@utils/withLoadable'

export default loadable(async () => import(/* webpackChunkName: "home" */ './index'), {
    fallback: <div>1234</div>
})
