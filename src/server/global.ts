import { post, get } from '@/utils/http'

/** 获取定位信息 */
export const getCity: loginType.httpFunc<null, loginType.addressDetailsType> = () => {
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

/** 获取天气信息 */
export const getSimpleWeater: globalServer.getWeaterFuncType = (params) => {
    return get<globalServer.weaterDataType>('/get/simple/weather', { params })
}
