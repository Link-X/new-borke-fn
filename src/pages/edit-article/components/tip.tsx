import React from 'react'

import { Tooltip } from 'antd'

interface Iprops {
    clickFile(): void
    activedPreview(e: React.MouseEvent<HTMLLIElement, MouseEvent>): void
    preview: boolean
    centerInput: React.LegacyRef<HTMLInputElement>
    centerUploadImg: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EditTip = (props: Iprops) => {
    const { preview } = props
    return (
        <ul className="textare-tools">
            <input
                type="file"
                onChange={props.centerUploadImg}
                accept="image/*"
                className="centeruploadInput"
                ref={props.centerInput}
            ></input>
            <li
                onClick={(e) => {
                    props.clickFile()
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
