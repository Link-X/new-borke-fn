import React, { useRef, useEffect, useState } from 'react'

import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import iToast from 'iu-toast'

import { setImageBackground } from '@/utils/login_back'

import { propsRoute } from '@/typescript/index'

import { login } from '@/server'

import './index.less'

type Iprops = propsRoute
const LoginPage: React.FC<any> = (props: Iprops): JSX.Element => {
    const [notForget, setNotForget] = useState<boolean>(true)
    const boxRef = useRef()

    const onFinish = async (values: loginType.formDataType) => {
        const data = await login(values)
        localStorage.setItem('token', data.token)
        iToast.success('登陆成功')
        props.history.push('/')
    }

    useEffect(() => {
        setImageBackground(boxRef.current)
    }, [])

    return (
        <div className="login-box" ref={boxRef}>
            <div className="login-form">
                <Form name="login" className="form_box" onFinish={onFinish}>
                    <div className="login_title">登陆 / 注册</div>
                    <Form.Item rules={[{ required: true, message: '请输入用户名!' }]} name="userName">
                        <Input
                            maxLength={11}
                            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="账号"
                        />
                    </Form.Item>
                    <Form.Item rules={[{ required: true, message: '请输入密码!' }]} name="password">
                        <Input.Password
                            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item className="form-bottom_btn">
                        <Checkbox
                            checked={notForget}
                            onChange={() => {
                                setNotForget(!notForget)
                            }}
                        >
                            记住登陆
                        </Checkbox>
                        <a className="login-form-forgot" href="">
                            忘记密码
                        </a>
                        <div>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </div>
                        <div className="login_tip">登陆即可完成注册!</div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage
