import React, { useEffect, useRef } from 'react'

import ReactMarkdown from 'react-markdown'
import { message } from 'antd'

import CodeMirrorEditor from './components/code-mirror-editor'
import CodeStyle from '@/common/article/code-style'
import EditTip from './components/tip'
import EditHeader from './components/edit-header'

import { useSetState } from '@/hooks/index'
import { markdownText } from './default'
import { VisitorFormVerify } from './utils'
import { compressionImg, getUrlParam } from '@/utils'

import { getTags, uploadImage, getArticleDetails, addArticle, editArticleDetials } from '@/server'

import { propsRoute } from '@/typescript'

import 'github-markdown-css'
import './index.less'

type Iprops = propsRoute

interface docType {
    doc: {
        scrollTop: number
        height: number
    }
}

const EditArticle: React.FC<Iprops> = (props: Iprops): JSX.Element => {
    const [state, setState] = useSetState<articleType.stateType>({
        form: {
            markdown: markdownText,
            tagId: undefined,
            title: '',
            articleImg: '',
            id: undefined
        },
        tagData: [],
        preview: true
    })

    const codeMirror = useRef<any>()
    const uploadInput = useRef<HTMLInputElement>()
    const centerInput = useRef<HTMLInputElement>()
    const editArticle = useRef<HTMLDivElement>()
    const previewBox = useRef<HTMLDivElement>()

    const editOnScroll = (e: docType) => {
        const { scrollTop, height } = e.doc
        const boxHeight = editArticle.current.getBoundingClientRect().height
        const previewHeight = document.querySelector('.markdown-body').getBoundingClientRect().height
        const scale = (height - boxHeight) / (previewHeight - boxHeight)
        previewBox.current.scrollTo(0, scrollTop / scale)
    }

    const onChange = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const { form } = state
        form.markdown = e.target.value
        setStatForm()
    }

    const activedPreview = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
        setState({
            preview: !preview
        })
    }

    const setStatForm = () => {
        setState({
            form: { ...form }
        })
    }

    const setInp = (e: string) => {
        const { form } = state
        form.title = e
        setStatForm()
    }

    const upload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<string> => {
        const imgBase64 = await compressionImg(e)
        const { path } = await uploadImage({ file: imgBase64 })
        uploadInput.current.value = ''
        centerInput.current.value = ''
        return path
    }

    const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { form } = state
        form.articleImg = await upload(e)
        setStatForm()
    }

    const centerUploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const path = await upload(e)
        const { form } = state
        form.markdown += `  ![](${path})`
        setState({
            form: { ...form }
        })
        setTimeout(() => {
            codeMirror.current.setCursor()
        }, 20)
    }

    const removeImg = () => {
        const { form } = state
        form.articleImg = ''
        uploadInput.current.value = ''
        setStatForm()
    }

    const selectTag = (v: articleType.tagType) => {
        let { tagData, form } = state
        tagData = tagData.map((item) => {
            item.checkouted = item.id === v.id
            return { ...item }
        })
        form.tagId = v.id
        setState({
            tagData,
            form: { ...form }
        })
    }

    const overEnter = async () => {
        const { form } = state
        const httpPost = form.id ? editArticleDetials : addArticle
        try {
            await httpPost(form)
            message.success('保存成功')
            props.history.push('/article')
        } catch (err) {
            message.error('保存失败')
        }
    }

    const submit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation()
        try {
            const { form } = state
            await VisitorFormVerify<articleType.venifyType>(form)
            overEnter()
        } catch (status) {
            message.error(status.message)
        }
    }

    const getNav = async (id: number) => {
        const res = await getTags(null)
        setState({
            tagData: res.map((v) => {
                v.checkouted = v.id === id
                return v
            })
        })
    }

    const getDetails = async (id: string) => {
        if (!id) {
            getNav(null)
            return
        }
        const res = await getArticleDetails(id)
        await getNav(res.tagId)
        setState({
            form: {
                markdown: res.markdown,
                tagId: res.tagId,
                title: res.title,
                articleImg: res.articleImg,
                id: +id
            }
        })
    }

    const init = () => {
        const { id } = getUrlParam<{ id: string }>()
        getDetails(id)
    }

    const clickFile = () => {
        uploadInput.current.click()
    }

    const clickFile2 = () => {
        centerInput.current.click()
    }

    const { form, tagData, preview } = state

    useEffect(() => {
        init()
    }, [])

    return (
        <div className="edit-article_box">
            <EditHeader
                form={form}
                tagData={tagData}
                setInp={setInp}
                uploadImg={uploadImg}
                clickFile={clickFile}
                removeImg={removeImg}
                uploadInput={uploadInput}
                selectTag={selectTag}
                submit={submit}
            />
            <div className="edit-article-edit">
                <div
                    ref={editArticle}
                    className="edit-article-textare editor-pane"
                    style={{ display: `${preview ? 'block' : 'none'}` }}
                >
                    <CodeMirrorEditor
                        ref={codeMirror}
                        editOnScroll={editOnScroll}
                        value={form.markdown}
                        onChange={onChange}
                    />
                </div>
                <div
                    ref={previewBox}
                    className={`edit-article-markdown result-pane ${
                        !preview ? 'preview-edit' : 'engter-edit'
                    }`}
                >
                    <ReactMarkdown
                        className="markdown-body"
                        skipHtml={true}
                        renderers={{ code: CodeStyle as any }}
                        source={form.markdown}
                    ></ReactMarkdown>
                    <EditTip
                        centerInput={centerInput}
                        centerUploadImg={centerUploadImg}
                        preview={preview}
                        clickFile={clickFile2}
                        activedPreview={activedPreview}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditArticle
