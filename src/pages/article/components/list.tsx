import React from 'react'

import { Button } from 'antd'

import { getArticleDate } from '@/utils/index'

interface Iprops {
    articleList: articleType.articleItemType[]
    navList: articleType.tagType[]
    goDetails(v: articleType.articleItemType): void
}

const ArticleList = (props: Iprops): JSX.Element => {
    const { articleList } = props

    const tagName = (id: number): string => {
        return props.navList.find((v) => v.id === id)?.tag
    }

    return (
        <ul>
            {articleList.map((v, i) => {
                return (
                    <li
                        key={v.id}
                        style={{ display: v.show ? 'flex' : 'none' }}
                        className={`article-item ${v.hot ? 'article-item_hot' : ''}`}
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
                                <span>{tagName(v.tagId)}</span>
                                <div>
                                    <Button
                                        onClick={props.goDetails.bind(this, v)}
                                        type="primary"
                                        className="white-btn"
                                    >
                                        查看
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default ArticleList
