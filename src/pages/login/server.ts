import { post } from '@/utils/http'

/** 登录 */
export const login: loginType.loginFuncType = async (params) => {
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

/** 获取定位信息 */
export const getCity: loginType.getCityType = () => {
    return new Promise((resolve, reject) => {
        let address_detail: loginType.addressDetailsType = {} as loginType.addressDetailsType
        window.showLocation = (data: loginType.addressType) => {
            address_detail = data.content.address_detail
        }
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src =
            'https://api.map.baidu.com/location/ip?ak=BhckEOslyspzdDFOnuniCNlULdljhPxl&coor=bd09ll&callback=showLocation'
        document.head.appendChild(script)
        script.onload = function() {
            resolve(address_detail)
        }
        script.onerror = function(e) {
            reject(e)
        }
    })
}
