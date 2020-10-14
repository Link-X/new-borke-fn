import React, { useState } from 'react'

import { Input } from 'antd'

import { SearchOutlined } from '@ant-design/icons'

interface Iprops {
    filterTag(id: string): void
    changeVal(e: string): void
    navList: articleType.tagType[]
    activedTag: string | number
}

const ArticleSide = (props: Iprops): JSX.Element => {
    const [val, setVal] = useState<string>('')
    const { navList, activedTag } = props

    const filterTag = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const tagId = event.target.getAttribute('tag-id')
        props.filterTag(tagId)
    }
    console.log(activedTag)
    return (
        <ul>
            <li className="td">
                <ul className="td-ul" onClick={filterTag}>
                    <li>
                        <Input
                            value={val}
                            prefix={<SearchOutlined color="#e8e8e8" size={20} />}
                            onChange={(e) => {
                                setVal(e.target.value)
                                props.changeVal(e.target.value)
                            }}
                            type="text"
                            placeholder="输入标题、作者搜索"
                        />
                    </li>
                    <li className={`${activedTag === 'all' && 'active'}`} tag-id="all">
                        全部
                    </li>
                    <li className={`${activedTag === 'hot' && 'active'}`} tag-id="hot">
                        星标
                    </li>
                </ul>
            </li>
            <li className="bd">
                <ul onClick={filterTag}>
                    {navList.map((v) => {
                        return (
                            <li
                                className={`${String(activedTag) === String(v.id) && 'active'}`}
                                tag-id={v.id}
                                key={v.id}
                            >
                                {v.tag}
                            </li>
                        )
                    })}
                </ul>
            </li>
        </ul>
    )
}

export default ArticleSide
