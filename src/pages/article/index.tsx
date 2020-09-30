import React, { useEffect, useState } from 'react'

import { Input, Button } from 'antd'

import Header from '@/common/header'

import { getTags, getArticle, getMajor } from './server'

import { getArticleDate } from '@/utils/index'

import { propsRoute } from '@/typescript/global'

import './index.less'

const Article: React.FC<propsRoute> = (props: propsRoute): JSX.Element => {
    const [navList, setNavList] = useState<articleType.tagType[]>([])
    const [articleList, setArticleList] = useState<articleType.articleItemType[]>([])

    const getTagsFunc = async (): Promise<any> => {
        const res = await getTags()
        setNavList(res || [])
    }

    const getArticleFunc = async (): Promise<any> => {
        const res = await getArticle({
            page: 0,
            pageSize: 10000
        })
        const res2 = await getMajor()
        res2.major.forEach((v) => {
            v.hot = true
        })
        res2.major2.forEach((v) => {
            v.hot = true
        })
        setArticleList(
            [...res2.major, ...res2.major2, ...res.list].sort((a, b) => {
                return Math.random() - 0.5
            })
        )
    }

    const getMajorFunc = async (): Promise<any> => {
        const res = await getMajor()
        console.log(res.major, res.major2)
    }

    const getData = async (): Promise<any> => {
        getTagsFunc()
        getArticleFunc()
        getMajorFunc()
    }

    const tagName = (id: number): string => {
        return navList.find((v) => v.id === id).tag
    }

    const goDetails = (item: articleType.articleItemType) => {
        console.log(item)
        props.history.push(`/article/details?id=${item.id}`)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <Header className="" router={props} />
            <div className="article">
                <section className="content">
                    <div className="left">
                        <ul>
                            <li className="td">
                                <ul>
                                    <li>
                                        <Input type="text" placeholder="搜索" />
                                    </li>
                                    <li className="active">全部</li>
                                    <li>星标</li>
                                </ul>
                            </li>
                            <li className="bd">
                                <ul>
                                    {navList.map((v) => {
                                        return <li key={v.id}>{v.tag}</li>
                                    })}
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="right">
                        <ul>
                            {articleList.map((v, i) => {
                                return (
                                    <li key={i} className={`article-item ${v.hot ? 'article-item_hot' : ''}`}>
                                        <div className="hd img-box">
                                            <div
                                                className="img-back"
                                                style={{ backgroundImage: `url('${v.articleImg}')` }}
                                            >
                                                <div className="article-date">
                                                    {getArticleDate(v.createDate)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="td">
                                            <div>
                                                <h3 className="article-name">{v.title}</h3>
                                            </div>
                                            <div>
                                                <span>{tagName(v.tagId)}</span>
                                                <div>
                                                    {/* <Button type="primary" className="gray-btn">
                                                        编辑
                                                    </Button> */}
                                                    <Button
                                                        onClick={goDetails.bind(this, v)}
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
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Article
