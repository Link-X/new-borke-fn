import React, { useEffect, useState, useRef } from 'react'

import ReactMarkdown from 'react-markdown'
import { message, Button, Input, Modal } from 'antd'

import CodeStyle from '@/common/article/code-style'
import HeadingBlock from '@/common/article/headering-block'

import { getUrlParam, formatDateTime, throttle } from '@/utils/index'

import { getArticleDetails, addCommentArticle, loveArticle, delArticleRequest } from '@/server'

import { propsRoute } from '@/typescript/index'

import './index.less'
import 'github-markdown-css'

type Iprops = propsRoute

const { confirm } = Modal
const { TextArea } = Input
const ArticleDetails: React.FC<Iprops> = (props: Iprops): JSX.Element => {
    const [details, setDetails] = useState<articleType.articleDetails>({ pinglunList: [] } as any)
    const [commentsVal, setCommentsVal] = useState<string>('')
    const [goTop, setGoTop] = useState<boolean>(false)
    const [routerParams] = useState<{ id: string }>(getUrlParam<{ id: string }>())

    const areaRef = useRef<HTMLInputElement>()

    const init = async () => {
        if (!routerParams.id) {
            message.error('参数错误')
            return
        }
        const res = await getArticleDetails(routerParams.id)
        setDetails(res)
    }

    const editArticle = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        props.history.push(`/edit-article?id=${details.id}`)
    }

    const delTip = (cb: Function, text: string) => {
        confirm({
            title: text,
            content: '确定要删除吗？',
            okType: 'danger',
            cancelText: '取消',
            okText: '删除',
            onOk: () => {
                cb()
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    }

    const delArticle = () => {
        delTip(() => {
            delTip(async () => {
                await delArticleRequest({ id: details.id })
                message.success('删除成功')
                setTimeout(() => {
                    window.location.href = '/'
                }, 500)
            }, '再次确定?')
        }, '确定要删除？')
    }

    const loverArticle = async () => {
        const data = await loveArticle({ id: +routerParams.id })
        details.userLoveStatus = data.status
        details.loveLen = Number(data.loveLen)
        setDetails({ ...details })
    }

    const goPinLun = () => {
        areaRef.current.focus()
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentsVal(e.target.value)
    }

    const submitPingLun = async () => {
        if (!commentsVal || (commentsVal && commentsVal.length <= 5)) {
            message.warning('请输入至少5个字符!')
            return
        }
        await addCommentArticle({
            text: commentsVal,
            articleId: routerParams.id
        })
        message.success('发表成功!')
        init()
    }

    const getArticleDate = (date: string): string => {
        return ''
    }

    const goPageTop = () => {
        window.scrollTo(0, 0)
    }

    const scrollPage = (): Function => {
        return throttle(
            () => {
                if (document.documentElement.scrollTop >= 100) {
                    setGoTop(true)
                } else {
                    setGoTop(false)
                }
            },
            500,
            800
        )
    }

    useEffect(() => {
        init()
        const sc: any = scrollPage()
        window.addEventListener('scroll', sc)
        return () => {
            window.removeEventListener('scroll', sc)
        }
    }, [])

    return (
        <div className="article-details_box">
            <div className="article-details_box">
                <div className="markdown-body_box">
                    <div className="article-user_box">
                        <div className="user-box_image">
                            <img src={details.userImage} />
                        </div>
                        <div className="article-user_text">
                            <span className="user-text_title">{details.userName}</span>
                            <p className="user-text_date">
                                <span>{formatDateTime(details.createDate)}</span>
                                <span>阅读: {details.articleReadCountLen || 0}</span>
                                {details.isEdit && (
                                    <a onClick={editArticle}>
                                        <b className="article-edit_btn" onClick={editArticle}>
                                            编辑
                                        </b>
                                    </a>
                                )}
                                {details.isEdit && (
                                    <a>
                                        <b className="article-edit_btn" onClick={delArticle}>
                                            删除
                                        </b>
                                    </a>
                                )}
                            </p>
                        </div>
                    </div>
                    <h2 className="markdown-body_title">{details.title}</h2>
                    <ReactMarkdown
                        className="markdown-body"
                        skipHtml={true}
                        renderers={{
                            code: CodeStyle as any,
                            heading: HeadingBlock
                        }}
                        source={details.markdown}
                    ></ReactMarkdown>
                    <div className="article-left-tools">
                        <div className="left-tools_box" onClick={loverArticle}>
                            <span className="left-tools_tip">{details.loveLen}</span>
                            <i
                                className={`iconfont icon-dianzan-copy left-tools_love ${
                                    details.userLoveStatus === '1' ? 'left-tools-love_article' : ''
                                }`}
                            ></i>
                        </div>
                        <div className="left-tools_box" onClick={goPinLun}>
                            <i className="iconfont icon-pinglun left-tool_pinlun"></i>
                        </div>
                    </div>
                </div>

                <div className="article-pinglun_box">
                    <ul className="article-pinglun_ul">
                        <p className="pinglun-ul_title">评论</p>
                        <div className="pinglun-Text">
                            <TextArea
                                value={commentsVal}
                                onChange={onChange}
                                placeholder="请开始您的表演，欢迎指出错误,一起学习。"
                                autosize={{ minRows: 3, maxRows: 5 }}
                                ref={areaRef}
                            />
                            <Button type="primary" style={{ marginTop: '10px' }} onClick={submitPingLun}>
                                发表
                            </Button>
                        </div>
                        {details.pinglunList.map((v) => {
                            return (
                                <li className="pinglun-ul_item" key={v.createDate}>
                                    <div className="pinglun-ul_item_top">
                                        <div className="pinglun-ul_touxiang">
                                            <img src={v.userImage}></img>
                                        </div>
                                        <span className="pinglun-span pinglun-userName">{v.userName}</span>
                                        <span className="pinglun-span pinglun-created">
                                            {getArticleDate(v.createDate)}
                                        </span>
                                    </div>
                                    <div className="pinglun-text_box">
                                        <p>{v.text}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {goTop && (
                    <div className="article-gotop" onClick={goPageTop}>
                        <i className="iconfont icon-fanhuidingbu"></i>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArticleDetails
