import { get } from '@/utils/http'

/** 获取文章详情 */
export const getArticleDetails: articleType.getArtcileDetails = (id: string) => {
    return get<articleType.articleDetails>('/get/article/details', {})
}
