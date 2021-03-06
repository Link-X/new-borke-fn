import React from 'react'
import loadable from '@/utils/withLoadable'
import Loading from '@/common/loading2'

export default loadable(async () => import(/* webpackChunkName: "article" */ './index'), {
    fallback: <Loading />
})
