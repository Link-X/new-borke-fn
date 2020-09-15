import React, { useRef, useEffect } from 'react'
import { setImageBackground } from '@/utils/login_back'

import './index.less'

// const FormBox: React.FC<any> = (): JSX.Element => {
//     return <div></div>
// }

const LoginPage: React.FC<any> = (): JSX.Element => {
    const boxRef = useRef<React.LegacyRef<HTMLDivElement>>()
    useEffect(() => {
        setImageBackground(boxRef.current)
    }, [])
    return (
        <div className="login-box" ref={boxRef.current}>
            <div className="login-form"></div>
        </div>
    )
}

export default LoginPage
