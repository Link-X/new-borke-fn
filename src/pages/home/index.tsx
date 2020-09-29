import React, { useRef, useEffect } from 'react'

import Header from '@/common/header/index'
import SereenFirst from './components/sereen-first/index'
import SereenSecond from './components/sereen-second/index'

import { ScrollPage } from '@/hooks/index'
import { setBtnWater } from '@/utils/water-btn'

import { propsRoute } from '@/typescript/global'

import './index.less'

const PageNull: React.FC<propsRoute> = (props: propsRoute): JSX.Element => {
    const ref = useRef()
    const [index] = ScrollPage(ref)

    useEffect(() => {
        setBtnWater(ref.current, {
            type: 'agent',
            typeNodeName: 'DIV'
        })
    }, [])
    return (
        <div className="xdb-home-center">
            <Header className={index === 1 ? 'bottom-header' : ''} router={props} />
            <div className="home-center_desk" ref={ref}>
                <SereenFirst />
                <SereenSecond />
            </div>
        </div>
    )
}

export default PageNull
