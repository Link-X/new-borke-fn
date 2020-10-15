import React from 'react'

import { Popover, Button } from 'antd'

interface Iprops {
    form: articleType.formType
    tagData: articleType.tagType[]
    setInp(e: string): void
    uploadImg(e: React.ChangeEvent<HTMLInputElement>): void
    clickFile(): void
    removeImg(): void
    selectTag(v: articleType.tagType): void
    submit(e: React.MouseEvent<HTMLElement, MouseEvent>): void
    uploadInput: React.LegacyRef<HTMLInputElement>
}

const EditHeader = (props: Iprops): JSX.Element => {
    const { form, tagData, uploadInput } = props

    return (
        <div className="edit-header">
            <input
                type="file"
                onChange={props.uploadImg}
                accept="image/*"
                className="uploadInput"
                ref={uploadInput}
            ></input>
            <div className="edit-article_title">
                <div className="edit-article_inp">
                    <input
                        defaultValue={form.title}
                        onChange={(e) => {
                            props.setInp(e.target.value)
                        }}
                        placeholder="请输入文章标题..."
                    ></input>
                </div>
                <div className="edit-article-btn">
                    <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                        <Popover
                            placement="bottom"
                            title="上传封面"
                            content={
                                <div className="upload-content">
                                    {!form.articleImg ? (
                                        <p onClick={props.clickFile}>点击添加封面</p>
                                    ) : (
                                        <div className="edit-article_img_box">
                                            <span onClick={props.removeImg}>x</span>
                                            <img
                                                src={form.articleImg}
                                                style={{ width: '100%', height: '100%' }}
                                            ></img>
                                        </div>
                                    )}
                                </div>
                            }
                            trigger="click"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width="35px"
                                height="35px"
                                viewBox="0 0 28 28"
                                version="1.1"
                            >
                                <title>699ED11E-7F16-40A5-89DD-C9ADE30CCB4C</title>
                                <desc>Created with sketchtool.</desc>
                                <defs />
                                <g id="0.1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g
                                        id="Markdown－编辑3"
                                        transform="translate(-1247.000000, -18.000000)"
                                        fill="#BFC6CE"
                                    >
                                        <g id="heder_img" transform="translate(1247.000000, 18.000000)">
                                            <path d="M5,7 L24,7 L24,21 L5,21 L5,7 Z M6,8 L23,8 L23,15 L6,15 L6,8 Z M9,11 C9.55228475,11 10,10.5522847 10,10 C10,9.44771525 9.55228475,9 9,9 C8.44771525,9 8,9.44771525 8,10 C8,10.5522847 8.44771525,11 9,11 Z M22,14 L10,14 L14.2570991,10.8078101 L15.778026,11.8338712 L19.2346782,8.98370162 L22,11.0150952 L22,14 Z" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </Popover>
                    </div>
                    <div className="article-btn_subimt">
                        <Popover
                            className="article-box"
                            placement="bottom"
                            title="发布文章"
                            content={
                                <div className="article-submit_box">
                                    <ul className="submit-box_tag">
                                        <span>分类</span>
                                        {tagData.map((v) => {
                                            return (
                                                <li
                                                    key={v.id}
                                                    onClick={() => {
                                                        props.selectTag(v)
                                                    }}
                                                    className={v.checkouted ? 'article' : ''}
                                                >
                                                    {v.tag}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <div className="submit-submit">
                                        <Button type="primary" onClick={props.submit}>
                                            确定发布
                                        </Button>
                                    </div>
                                </div>
                            }
                            trigger="click"
                        >
                            发布
                        </Popover>
                    </div>
                    <div className="article-btn_user">
                        <img src="https://mirror-gold-cdn.xitu.io/168e08e1a5a2e53f643?imageView2/1/w/64/h/64/q/85/interlace/1"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditHeader
