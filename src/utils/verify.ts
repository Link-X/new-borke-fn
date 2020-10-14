/* eslint-disable */
import { objectLen, isObject, typeOfS, isFunc, getTypeLen, getType } from './type-of'
export interface statusType {
    status: boolean
    message: string
}

class Verify {
    constructor(data, rules) {
        this.data = null
        this.rules = {}
        this.$init(data, rules)
    }
    $init<T>(data: T, rules) {
        // 开发模式
        // if (!data || !objectLen(rules)) {
        //     console.error('设置的校验数据或规则错误')
        //     return
        // }
        this.data = JSON.parse(JSON.stringify(data))
        this.rules = rules
    }
    ruleCallBack(status: statusType): Function {
        // 自定义校验
        return (cb: Function) => {
            status.status = !!(cb && cb.message)
            status.message = cb && cb.message
        }
    }
    verifyTop(obj: any, val: any) {
        // 校验第一个规则
        const type = (obj.type ? obj.type : getType(val)).toLocaleLowerCase()
        const func = typeOfS[type] || (() => {})
        return !(val && func(val))
    }
    verifyBottom(obj: any, val: any) {
        // 校验第二个规则
        const section = obj.min && obj.max && obj.type !== 'date'
        if (!section) return false
        const type = getType(val)
        const len = getTypeLen[type](val)
        const lenSection = len >= obj.min && len <= obj.max
        return !lenSection
    }
    iterator(rules: any) {
        if (!isObject(rules)) {
            return
        }
        let status = {
            status: false,
            message: '',
            key: ''
        }
        for (let v of Object.keys(rules)) {
            const judge = { ...this.rules[v][0], ...this.rules[v][1] }
            const val = this.data[v]
            if (isFunc(judge.validator)) {
                judge.validator(val, this.ruleCallBack(status))
            } else if (judge.required) {
                status.status = this.verifyTop(judge, val) || this.verifyBottom(judge, val)
            } else if (!judge.required && judge.min && judge.max) {
                status.status = val && this.verifyBottom(judge, val)
            }
            if (status.status) {
                // status 为true停止校验
                status.key = v
                status.message = status.message ? status.message : judge.message
                return status
            }
        }
        return status
    }
    validate(cb) {
        const status = this.iterator(this.rules)
        const data = {
            key: status.key,
            result: status.status || status.message,
            message: status.message
        }
        cb(data)
        return data
    }
    addRule(rule) {}
}

export default Verify
