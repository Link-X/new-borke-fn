declare namespace articleType {
    export interface tagType {
        id: number
        tag: string
    }
    /** 获取标签 */
    export interface getTagsFunc {
        (): Promise<tagType[]>
    }

    export interface articleItemType {
        articleImg: string
        createDate: string
        introduce: string
        tagId: number
        userImage: string
        major: null
        id: number
        major2: null
        title: string
        userName: string
        hot?: boolean
        show?: boolean
    }

    export interface articleListDataType {
        list: articleItemType[]
    }
    export interface getArtilceParams {
        page: number
        pageSize: number
    }

    /** 获取文章列表 */
    export interface getArticleListType {
        (params: getArtilceParams): Promise<articleListDataType>
    }

    export interface majorItemType {
        major: articleItemType[]
        major2: articleItemType[]
    }

    /** 获取热门文章 */
    export interface getMajorType {
        (): Promise<majorItemType>
    }

    export interface pinglunDataType {
        articleId: number
        createDate: string
        id: number
        text: string
        userId: number
        userImage: string
        userName: string
    }

    /** 文章详情 */
    export interface articleDetails {
        articleImg: string
        articleReadCountLen: number
        createDate: string
        id: number
        introduce: string
        isEdit: boolean
        loveLen: number
        major: boolean
        major2: boolean
        markdown: string
        markdown_index: any
        pinglunList: pinglunDataType[]
        readNumber: number
        tag: any
        tagId: number
        title: string
        title_index: number
        userId: number
        userImage: string
        userLoveStatus: string
        userName: string
    }

    /** get article details */
    export interface getArtcileDetails {
        (id: string): Promise<articleDetails>
    }

    export interface addCommentArticleParamsType {
        text: string
        articleId: string
    }

    /** 评论 */
    export interface addCommentArticleFunc {
        (params: addCommentArticleParamsType): Promise<pinglunDataType>
    }

    export interface loveNumType {
        articleReadCountLen: number
        loveLen: number
        status: string
    }

    /** 点赞 */
    export interface loveArticleFunc {
        (params: { id: number }): Promise<loveNumType>
    }

    /** 删除文章 */
    export interface delArticleFunc {
        (params: { id: number }): Promise<any>
    }
}
