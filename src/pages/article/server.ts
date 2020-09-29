import { get } from '@/utils/http'

/** 获取tags */
export const getTags: articleType.getTagsFunc = () => {
    return get<articleType.tagType[]>('/get/tags', {})
}

/** 获取文章列表 */
export const getArticle: articleType.getArticleListType = (params) => {
    return get<articleType.articleListDataType>('/get/article/list', { params })
}

/** 获取热门 */
export const getMajor: articleType.getMajorType = () => {
    return get<articleType.majorItemType>('/get/article/major', {})
}
