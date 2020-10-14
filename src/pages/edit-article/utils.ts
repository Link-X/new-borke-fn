import Verify from '@/utils/verify'

const verifyFunc = new Verify({}, {})
export const VisitorFormVerify = <T>(formData: articleType.formType): Promise<T> => {
    return new Promise((resolve, reject) => {
        verifyFunc.$init(formData, {
            title: [
                {
                    required: true,
                    message: '请输入3-50字文章标题',
                    type: 'string',
                    min: 3,
                    max: 50
                }
            ],
            markdown: [
                {
                    required: true,
                    message: '内容请最少输入60字',
                    type: 'string',
                    min: 60,
                    max: 99999999
                }
            ],
            tagId: [
                {
                    message: '请选择文章标签',
                    validator: (val: number, cb: Function) => {
                        if (!val && val !== 0) {
                            cb(new Error('请选择文章标签'))
                        } else {
                            cb()
                        }
                    }
                }
            ]
        })
        verifyFunc.validate((status: T & articleType.venifyType) => {
            if (status.result) {
                return reject(status)
            }
            resolve(status)
        })
    })
}
