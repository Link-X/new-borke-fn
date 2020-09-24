import React from 'react'

import { Supermoon, Stormy, Cloudy, Sunny, Snowy } from '@/common/weather/index'

import './index.less'

const wartherDoms = {
    Supermoon: <Supermoon />,
    Sunny: <Sunny />,
    Cloudy: <Cloudy />,
    Stormy: <Stormy />,
    Snowy: <Snowy />
}

const SereenFirst: React.FC<any> = (): JSX.Element => {
    const dayType = 'Stormy'
    return (
        <div className="xdb-home_sereen1">
            <div className="xdb-home_tip">
                <div className="warther_box">{wartherDoms[dayType]}</div>
            </div>
        </div>
    )
}

export default SereenFirst
