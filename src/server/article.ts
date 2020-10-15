import { get } from '@/utils/http'

/** 获取tags */
export const getTags: articleType.httpFunc<null, articleType.tagType[]> = () => {
    return get<articleType.tagType[]>('/get/tags', {})
}

/** 获取文章列表 */
export const getArticle: articleType.httpFunc<
    articleType.getArtilceParams,
    articleType.articleListDataType
> = (params) => {
    return get<articleType.articleListDataType>('/get/article/list', { params })
}

/** 获取热门 */
export const getMajor: articleType.httpFunc<null, articleType.majorItemType> = () => {
    return get<articleType.majorItemType>('/get/article/major', {})
}
