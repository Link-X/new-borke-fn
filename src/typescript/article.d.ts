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
        pinglunList: any[]
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
}
