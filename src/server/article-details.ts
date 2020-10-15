import { get, post } from '@/utils/http'

/** 获取文章详情 */
export const getArticleDetails: articleType.httpFunc<string, articleType.articleDetails> = (id) => {
    return get<articleType.articleDetails>('/get/article/details', { params: { id } })
}

/** 评论 */
export const addCommentArticle: articleType.httpFunc<
    articleType.addCommentArticleParamsType,
    articleType.pinglunDataType
> = (params) => {
    return post<articleType.pinglunDataType>('/add/article-comment', params)
}

/** 点赞 */
export const loveArticle: articleType.httpFunc<{ id: number }, articleType.loveNumType> = (parasm) => {
    return post('/love/article', parasm)
}

/** 删除文章 */
export const delArticleRequest: articleType.httpFunc<{ id: number }, any> = (params) => {
    return post('/del/article', params)
}
