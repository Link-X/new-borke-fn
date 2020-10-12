import React, { useEffect, useState } from 'react'

import Header from '@/common/header'
import ArticleList from './components/list'
import ArticleSide from './components/side'

import { getTags, getArticle } from '@/server'
import { debounce } from '@/utils/index'

import { propsRoute } from '@/typescript/global'

import './index.less'

const Article: React.FC<propsRoute> = (props: propsRoute): JSX.Element => {
    const [navList, setNavList] = useState<articleType.tagType[]>([])
    const [articleList, setArticleList] = useState<articleType.articleItemType[]>([])
    const [activedTag, setActivedTag] = useState<string | number>('all')

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

    const changeVal = (value: string) => {
        setArticleList(
            articleList.map((v) => {
                v.show = v.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
                return v
            })
        )
    }

    const getIsNull = (): boolean => {
        if (!(articleList && articleList.length)) {
            return false
        }
        return articleList.some((v) => v.show)
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
                        <ArticleSide
                            filterTag={filterTag}
                            activedTag={activedTag}
                            navList={navList}
                            changeVal={debounce(changeVal, 500)}
                        />
                    </div>
                    <div className="right">
                        {getIsNull() ? (
                            <ArticleList articleList={articleList} navList={navList} goDetails={goDetails} />
                        ) : (
                            <div className="not-data">
                                <i className="iconfont icon-zanwushuju"></i>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Article
