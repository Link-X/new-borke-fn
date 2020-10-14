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
    const [filterVal, steFilterVal] = useState<string>('')

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

    const tagFillter = (item: articleType.articleItemType, tagId: string | number): boolean => {
        if (tagId === 'all') {
            return true
        } else if (tagId === 'hot') {
            return item.hot
        } else {
            return String(item.tagId) === String(tagId)
        }
    }

    const filterfList = (value: string, tagId: string | number): articleType.articleItemType[] => {
        const val = value.toLocaleLowerCase()
        return articleList.map((v) => {
            const contentIsInCludes =
                v.title.toLocaleLowerCase().includes(val) || v.userName.toLocaleUpperCase().includes(val)
            const isActived = tagFillter(v, tagId)
            v.show = contentIsInCludes && isActived
            return v
        })
    }

    const filterTag = (tagId: number | string) => {
        if (!tagId || activedTag === tagId) {
            return
        }
        setActivedTag(tagId)
        setArticleList(filterfList(filterVal, tagId))
    }

    const changeVal = (value: string) => {
        steFilterVal(value)
        setArticleList(filterfList(value, activedTag))
    }

    const getIsNull = (): boolean => {
        if (!(articleList && articleList.length)) {
            return false
        }
        return articleList.some((v) => v.show)
    }

    const goAddArticle = () => {
        props.history.push('/edit-article')
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
                        <div className="article-edit-box">
                            <a onClick={goAddArticle}>
                                <i className="iconfont icon-xiewenzhang edit-article"></i>
                            </a>
                        </div>
                    </div>
                    <div className="right">
                        {getIsNull() ? (
                            <ArticleList
                                filterTag={filterTag}
                                articleList={articleList}
                                navList={navList}
                                goDetails={goDetails}
                            />
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
