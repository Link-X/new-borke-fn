import React from 'react'
import loadable from '@/utils/withLoadable'
import Loading from '@/common/loading'

export default loadable(async () => import(/* webpackChunkName: "home" */ './index'), {
    fallback: <Loading />
})
