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
import { compressionImg } from '@/utils'

import { getTags, uploadImage } from '@/server'

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
            tagId: '',
            title: '',
            articleImg: ''
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
        console.log(v)
        let { tagData } = state
        tagData = tagData.map((item) => {
            item.checkouted = item.id === v.id
            return { ...item }
        })
        setState({
            tagData
        })
    }

    const submit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation()
        try {
            await VisitorFormVerify<articleType.venifyType>(form)
        } catch (status) {
            message.error(status.message)
        }
    }

    const getNav = async () => {
        const res = await getTags()
        setState({
            tagData: res
        })
        console.log(res)
    }

    const clickFile = () => {
        uploadInput.current.click()
    }
    const clickFile2 = () => {
        centerInput.current.click()
    }

    const { form, tagData, preview } = state

    useEffect(() => {
        getNav()
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
