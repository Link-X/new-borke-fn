import { post } from '@/utils/http'

import { getCity } from '@/server/global'

/** 登录 */
export const login: loginType.httpFunc<loginType.formDataType, loginType.loginEnterDataType> = async (
    params
) => {
    try {
        const address_detail = await getCity()
        const addresData = {
            province: address_detail.province,
            city: address_detail.city,
            district: address_detail.district,
            ...params
        }
        return post<loginType.loginEnterDataType>('/user/login', addresData)
    } catch (err) {
        return post<loginType.loginEnterDataType>('/user/login', params)
    }
}
