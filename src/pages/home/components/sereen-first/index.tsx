import React, { useEffect, useState } from 'react'

import { Supermoon, Stormy, Cloudy, Sunny, Snowy } from '@/common/weather/index'

import { strShowTime } from '@/hooks/index'

import { getCity, getSimpleWeater } from '@/server/global'

import { weatherData } from '@/common/data/index.json'

import './index.less'

const wartherDoms: any = {
    Supermoon: <Supermoon />,
    Sunny: <Sunny />,
    Cloudy: <Cloudy />,
    Stormy: <Stormy />,
    Snowy: <Snowy />
}

const oneText = '为什么要来这？哦，我说的是这个世界!'
const SereenFirst: React.FC<any> = (): JSX.Element => {
    const [dayType, setDayType] = useState<string>('Sunny')
    const [str] = strShowTime<string>(oneText, 2000)

    const getDayType = async (): Promise<any> => {
        try {
            const { city } = await getCity()
            const index = city.indexOf('市')
            const res: any = await getSimpleWeater({
                city: city.substring(0, index)
            })
            const parseWeater = JSON.parse(res) as globalServer.weaterDataType
            if (parseWeater.error_code !== 0) {
                return
            }
            const { weather } = parseWeater?.result?.future[1] || {}
            Object.keys(weatherData).forEach((v) => {
                const isDay = weatherData[v].some((j: string) => j === weather)
                isDay && setDayType(v)
            })
        } catch (err) {}
    }

    useEffect(() => {
        getDayType()
    }, [])
    return (
        <div className="xdb-home_sereen1">
            <div className="xdb-home_tip">
                <div className="warther_box">{wartherDoms[dayType]}</div>
                <div className="warther_box_text">
                    <div className="home-tip_top">美好的生命应该充满期待、惊喜和感激。</div>
                    <div className="home-tip_bottom">
                        想想{str} <span className="tip-cursor"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SereenFirst
