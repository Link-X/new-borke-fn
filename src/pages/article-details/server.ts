import { get, post } from '@/utils/http'

/** 获取文章详情 */
export const getArticleDetails: articleType.getArtcileDetails = (id: string) => {
    return get<articleType.articleDetails>('/get/article/details', { params: { id } })
}

/** 评论 */
export const addCommentArticle: articleType.addCommentArticleFunc = (
    params: articleType.addCommentArticleParamsType
) => {
    return post<articleType.pinglunDataType>('/add/article-comment', params)
}

/** 点赞 */
export const loveArticle: articleType.loveArticleFunc = (parasm) => {
    return post('/love/article', parasm)
}

/** 删除文章 */
export const delArticleRequest: articleType.delArticleFunc = (params) => {
    return post('/del/article', params)
}
