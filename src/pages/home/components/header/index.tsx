import React from 'react'

import './index.less'

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
    {
        label: '相册',
        value: 3,
        router: true,
        url: '/photo-album'
    },
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

const Header: React.FC<any> = (props: any): JSX.Element => {
    return (
        <nav className="xdb-home_header">
            <div className="home-header_concent">
                <h2 className="home-header_login">xdb</h2>
                <div className="header-nav-collapse">
                    <ul className="nav-collapse_ul">
                        {navList.map((v) => {
                            return (
                                <li key={v.url}>
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
                <div className="navBtn">
                    <button className="toggle-btn">
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
