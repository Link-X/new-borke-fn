import React, { useRef } from 'react'

import Header from './components/header/index'
import SereenFirst from './components/sereen-first/index'
import SereenSecond from './components/sereen-second/index'

import { ScrollPage } from '@/hooks/index'

import './index.less'

const PageNull: React.FC<any> = (): JSX.Element => {
    const ref = useRef()
    const [index] = ScrollPage(ref)

    return (
        <div className="xdb-home-center">
            <Header className={index === 1 ? 'bottom-header' : ''} />
            <div className="home-center_desk" ref={ref}>
                <SereenFirst />
                <SereenSecond />
            </div>
        </div>
    )
}

export default PageNull
