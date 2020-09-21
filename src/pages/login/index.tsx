import React, { useRef, useEffect } from 'react'

import { Form, Input, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { setImageBackground } from '@/utils/login_back'

import './index.less'

// const FormBox: React.FC<any> = (): JSX.Element => {
//     return <div></div>
// }

interface formDataType {
    userName: string
    password: string
}

const LoginPage: React.FC<any> = (): JSX.Element => {
    const boxRef = useRef()

    const onFinish = (values: formDataType) => {
        console.log(values)
    }

    useEffect(() => {
        setImageBackground(boxRef.current)
    }, [])
    return (
        <div className="login-box" ref={boxRef}>
            <div className="login-form">
                <Form name="login" onFinish={onFinish}>
                    <Form.Item
                        rules={[{ required: true, message: '请输入用户名!' }]}
                        label="账号"
                        name="userName"
                    >
                        <Input maxLength={11} prefix={<UserOutlined />} placeholder="请输入账号" />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: '请输入密码!' }]}
                        label="密码"
                        name="password"
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage
