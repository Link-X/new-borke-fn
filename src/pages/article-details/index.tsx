import React, { useEffect } from 'react'

// import { getArticleDetails } from './server'

import { propsRoute } from '@/typescript/index'

type Iprops = propsRoute

const ArticleDetails: React.FC<Iprops> = (props: Iprops): JSX.Element => {
    const init = async () => {
        const { search } = props.location
        console.log(search)
        // const res = await getArticleDetails()
    }

    useEffect(() => {
        init()
    }, [])

    return <div className="article-details_box">1234</div>
}

export default ArticleDetails
