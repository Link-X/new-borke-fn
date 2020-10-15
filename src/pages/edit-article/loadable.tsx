import React from 'react'
import loadable from '@/utils/withLoadable'
import Loading from '@/common/loading'

export default loadable(async () => import(/* webpackChunkName: "editArticle" */ './index'), {
    fallback: <Loading />
})
