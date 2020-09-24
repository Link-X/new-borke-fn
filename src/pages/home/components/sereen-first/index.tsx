import React, { useEffect } from 'react'

import { Supermoon, Stormy, Cloudy, Sunny, Snowy } from '@/common/weather/index'

import { getCity, getSimpleWeater } from '@/server/global'

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

    const getDayType = async (): Promise<any> => {
        const cityData = await getCity()
        const index = cityData.city.indexOf('市')
        const city = cityData.city.substring(0, index)
        const weaterData = getSimpleWeater({
            city
        })
        const parseWeater = JSON.parse(weaterData) as globalServer.weaterDataType
        if (parseWeater.error_code === 0) {
            console.log(parseWeater)
        }
    }

    useEffect(() => {
        getDayType()
    }, [])
    return (
        <div className="xdb-home_sereen1">
            <div className="xdb-home_tip">
                <div className="warther_box">{wartherDoms[dayType]}</div>
            </div>
        </div>
    )
}

export default SereenFirst
