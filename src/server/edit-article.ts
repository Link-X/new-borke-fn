import { get, post, put } from '@/utils/http'

export const uploadImage: articleType.httpFunc<articleType.uploadType, { path: string }> = (params) => {
    return post<{ path: string }>('/upload-image', params)
}

/** 新增文章 */
export const addArticle: articleType.httpFunc<articleType.formType, any> = (params) => {
    return put('/add/article', params)
}

/** 修改文章 */

export const editArticleDetials: articleType.httpFunc<articleType.formType, any> = (params) => {
    return post('/endit/article', params)
}
