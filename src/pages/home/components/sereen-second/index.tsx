import React from 'react'

import { Tabs } from 'antd'

import './index.less'

const { TabPane } = Tabs

const SereenSecond = () => {
    return (
        <div className="home-center page2">
            <div className="home-center_box">
                <div className="center-box">
                    <Tabs tabPosition="bottom">
                        <TabPane tab="" key="1" className="center-box_article">
                            <h2 className="center-box_title">
                                Hi,你好！ 我是
                                <strong>许道斌</strong>
                            </h2>
                            <article>
                                这里是我的博客。分享知识，传播快乐。很高兴认识你。欢迎来到这个网站。这里有前端开发最前沿的知识。以及一个前端开发工程师的日常(*^_^*)
                            </article>
                            <ul className="box-article_tag">
                                <li>Html</li>
                                <li>Css</li>
                                <li>JS</li>
                                <li>Node</li>
                                <li>以及更多.....</li>
                            </ul>
                            欢迎加入，一起分享吧&nbsp;
                            <a href="#/login">注册</a>
                        </TabPane>
                        <TabPane tab="" key="2" className="center-box_article">
                            <ul className="box-article_list">
                                <li>这里有一个前端人多年踩坑的一点点记录，和分享，快来一起探讨吧</li>
                                <li>
                                    本博前后端全部代均以github上传，傻瓜式安装机械式部署，你也想来一个吗？
                                </li>
                                <li>我正在搭建一个前端错误日监控平台，有兴趣一加入吗？</li>
                            </ul>
                        </TabPane>
                        <TabPane tab="" key="3" className="center-box_article">
                            哲学历史是我的最爱。正在看《人类简史》这是一部很有意思的书，推荐————
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default SereenSecond
