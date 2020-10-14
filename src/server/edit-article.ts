import { get, post } from '@/utils/http'

export const uploadImage: articleType.uploadImageFunct = (params) => {
    return post<{ path: string }>('/upload-image', params)
}
