import React from 'react'

import Header from './components/header/index'
import SereenFirst from './components/sereen-first/index'

import './index.less'

const PageNull: React.FC<any> = (): JSX.Element => {
    return (
        <div className="xdb-home-center">
            <Header />
            <div className="home-center_desk">
                <SereenFirst />
            </div>
        </div>
    )
}

export default PageNull
