import React from 'react'

import { getArticleDate } from '@/utils/index'

interface Iprops {
    articleList: articleType.articleItemType[]
    navList: articleType.tagType[]
    filterTag: (id: number) => void
    goDetails(v: articleType.articleItemType): void
}

const ArticleList = (props: Iprops): JSX.Element => {
    const { articleList } = props

    const tagName = (id: number): string => {
        return props.navList.find((v) => v.id === id)?.tag
    }

    const tagClick = (id: number) => {
        props.filterTag(id)
    }

    return (
        <ul>
            {articleList.map((v, i) => {
                return (
                    <li
                        key={v.id}
                        style={{ display: v.show ? 'flex' : 'none' }}
                        className={`article-item ${v.hot ? 'article-item_hot' : ''}`}
                        onClick={props.goDetails.bind(this, v)}
                    >
                        <div className="hd img-box">
                            <div className="img-back" style={{ backgroundImage: `url('${v.articleImg}')` }}>
                                <div className="article-date">{getArticleDate(v.createDate)}</div>
                            </div>
                        </div>
                        <div className="td">
                            <div>
                                <h3 className="article-name">{v.title}</h3>
                            </div>
                            <div>
                                <span>
                                    <span
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            tagClick(v.tagId)
                                        }}
                                        className="tag"
                                    >
                                        {tagName(v.tagId)}
                                    </span>
                                </span>
                                <div className="author">作者: {v.userName}</div>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default ArticleList
