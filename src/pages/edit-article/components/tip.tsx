import React from 'react'

import { Tooltip } from 'antd'

interface Iprops {
    clickFile(e: boolean): void
    activedPreview(e: React.MouseEvent<HTMLLIElement, MouseEvent>): void
    preview: boolean
}

const EditTip = (props: Iprops) => {
    const { preview } = props
    return (
        <ul className="textare-tools">
            <li
                onClick={(e) => {
                    props.clickFile(true)
                }}
            >
                <Tooltip title="上传图片">
                    <i className="iconfont icon-shangchuan"></i>
                </Tooltip>
            </li>
            <li onClick={props.activedPreview}>
                <Tooltip title={`${preview ? '预览(不要刷新）' : '收起(刷新会丢失)'}`}>
                    <i className={`iconfont ${!preview ? 'icon-BMSzhuanqu_suofang' : 'icon-suofang'}`}></i>
                </Tooltip>
            </li>
        </ul>
    )
}

export default EditTip
