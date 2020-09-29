import React, { useState, useRef, useEffect } from 'react'
import { setBtnWater } from '@/utils/water-btn'

import { propsRoute } from '@/typescript/global'

import './index.less'

interface navItmeType {
    label: string
    value: number
    url: string
}
const navList = [
    {
        label: '首页',
        value: 1,
        url: '/'
    },
    {
        label: '文章',
        value: 2,
        url: '/article'
    },
    // {
    //     label: '相册',
    //     value: 3,
    //     router: true,
    //     url: '/photo-album'
    // },
    {
        label: '登陆',
        value: 5,
        router: true,
        url: '/login'
    },
    {
        label: '资料',
        value: 6,
        router: true,
        url: '/datum'
    }
]

interface Iprops {
    router: propsRoute
    className: string
}

const Header: React.FC<Iprops> = (props: Iprops): JSX.Element => {
    const [checked, setChecked] = useState<boolean>(false)
    const ref = useRef()

    const goPage = (v: navItmeType) => {
        props.router.history.replace(v.url)
    }

    useEffect(() => {
        setBtnWater(ref.current, {
            type: 'agent',
            typeNodeName: 'NAV'
        })
    }, [])

    return (
        <nav className={`xdb-home_header ${props.className}`} ref={ref}>
            <div className="home-header_concent">
                <h2 className="home-header_login">xdb</h2>
                <div className="header-nav-collapse">
                    <ul className="nav-collapse_ul" style={{ opacity: checked ? 0 : 1 }}>
                        {navList.map((v) => {
                            return (
                                <li key={v.url} onClick={goPage.bind(this, v)}>
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault()
                                        }}
                                    >
                                        {v.label}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div
                    className="navBtn"
                    onClick={() => {
                        setChecked(!checked)
                    }}
                >
                    <button className={`toggle-btn ${checked ? 'active' : ''}`}>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Header
