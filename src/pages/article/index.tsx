import React, { useEffect, useState } from 'react'

import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import Header from '@/common/header'

import { getTags, getArticle } from './server'

import { getArticleDate } from '@/utils/index'

import { propsRoute } from '@/typescript/global'

import './index.less'

const Article: React.FC<propsRoute> = (props: propsRoute): JSX.Element => {
    const [navList, setNavList] = useState<articleType.tagType[]>([])
    const [articleList, setArticleList] = useState<articleType.articleItemType[]>([])
    const [activedTag, setActivedTag] = useState<string | number>('all')
    const [val, setVal] = useState<string>('')

    const getTagsFunc = async (): Promise<any> => {
        const res = await getTags()
        setNavList(res || [])
    }

    const setListItem = (list: articleType.articleItemType[], hot?: boolean) => {
        return list.map((v) => {
            v.hot = v.major || v.major2
            v.show = true
            return v
        })
    }

    const getArticleFunc = async (): Promise<any> => {
        const res = await getArticle({
            page: 0,
            pageSize: 10000
        })
        const list = setListItem(res.list)
        setArticleList(
            list.sort(() => {
                return Math.random() - 0.5
            })
        )
    }

    const getData = async (): Promise<any> => {
        getTagsFunc()
        getArticleFunc()
    }

    const tagName = (id: number): string => {
        return navList.find((v) => v.id === id)?.tag
    }

    const goDetails = (item: articleType.articleItemType) => {
        props.history.push(`/article-details?id=${item.id}`)
    }

    const filterTag = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
        const tagId = e.target.getAttribute('tag-id')
        if (!tagId) {
            return
        }
        setActivedTag(tagId)
        setArticleList(
            articleList.map((v) => {
                if (tagId === 'all') {
                    v.show = true
                } else if (tagId === 'hot') {
                    v.show = v.hot
                } else {
                    v.show = v.tagId === +tagId
                }
                return v
            })
        )
    }

    const changeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(e.target.value)
        setArticleList(
            articleList.map((v) => {
                v.show = v.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
                return v
            })
        )
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
                                <ul onClick={filterTag}>
                                    <li>
                                        <Input
                                            value={val}
                                            prefix={<SearchOutlined color="#e8e8e8" size={20} />}
                                            onChange={changeVal}
                                            type="text"
                                            placeholder="可输入标题搜索"
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
                                                className={`${activedTag === String(v.id) && 'active'}`}
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
                    </div>
                    <div className="right">
                        <ul>
                            {articleList.map((v, i) => {
                                return (
                                    <li
                                        key={i}
                                        style={{ display: v.show ? 'flex' : 'none' }}
                                        className={`article-item ${v.hot ? 'article-item_hot' : ''}`}
                                    >
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
