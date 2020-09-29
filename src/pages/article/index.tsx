import React, { useEffect, useState } from 'react'

import { Input, Button } from 'antd'

import { getTags, getArticle, getMajor } from './server'

import { propsRoute } from '@/typescript/global'

import './index.less'

const Article: React.FC<propsRoute> = (props: propsRoute): JSX.Element => {
    const [navList, setNavList] = useState<articleType.tagType[]>([])
    const [articleList, setArticleList] = useState<articleType.articleItemType[]>([])

    const getTagsFunc = async () => {
        const res = await getTags()
        setNavList(res || [])
    }
    const getArticleFunc = async () => {
        const res = await getArticle({
            page: 0,
            pageSize: 10000
        })
        setArticleList(res.list || [])
    }

    const getMajorFunc = async () => {
        const res = await getMajor()
        console.log(res.major, res.major2)
    }

    const getData = async () => {
        getTagsFunc()
        getArticleFunc()
        getMajorFunc()
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            {/* <Header router={props} className="" /> */}
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
                                    <li>热门</li>
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
                            {articleList.map((v) => {
                                return (
                                    <li key={v.id}>
                                        <div className="hd img-box">
                                            <img src={v.articleImg} alt="" />
                                        </div>
                                        <div className="td">
                                            <div>
                                                <h3>{v.title}</h3>
                                            </div>
                                            <div>
                                                <span>{v.tagId}</span>
                                                <div>
                                                    <Button type="primary" className="gray-btn">
                                                        编辑
                                                    </Button>
                                                    <Button type="primary" className="white-btn">
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
