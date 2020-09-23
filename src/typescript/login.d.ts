declare namespace loginType {
    /** 登录参数 */
    export interface formDataType {
        userName: string
        password: string
    }

    export interface userDataType {
        addres: string | null
        city: string | null
        createDate: string
        district: string | null
        email: string | null
        friendId: string | null
        groupId: string | null
        id: number
        iphone: string | null
        label: string | null
        name: string | null
        province: string | null
        remark: string | null
        userImage: string
        userName: string
        userType: string | null
    }
    /** 登录返回 */
    export interface loginEnterDataType {
        token: string
        useData: userDataType
    }

    /** 定位信息 */
    export interface addressDetailsType {
        province: string
        city: string
        district: string
    }

    /** 登接口 */
    export interface loginFuncType {
        (params: formDataType): Promise<loginEnterDataType>
    }

    /** 获取定接口j */

    export interface getCityType {
        (): Promise<addressDetailsType>
    }

    /** 定位信息 */
    export interface addressType {
        content: {
            address_detail: addressDetailsType
        }
    }
}
