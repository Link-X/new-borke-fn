declare namespace articleType {
    export interface tagType {
        id: number
        tag: string
        checkouted: boolean
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

    export interface majorItemType {
        major: articleItemType[]
        major2: articleItemType[]
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

    export interface addCommentArticleParamsType {
        text: string
        articleId: string
    }

    export interface loveNumType {
        articleReadCountLen: number
        loveLen: number
        status: string
    }

    export interface stateType {
        form: formType
        tagData: articleType.tagType[]
        preview: boolean
    }
    export interface formType {
        markdown: string
        tagId: number
        title: string
        articleImg: string
        id: number
    }

    export interface venifyType {
        result: boolean
        message: string
    }

    export interface uploadType {
        file: string
    }

    interface httpFunc<T, U> {
        (params: T): Promise<U>
    }
}
