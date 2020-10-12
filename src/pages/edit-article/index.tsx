import React, { useEffect, useRef } from 'react'

import ReactMarkdown from 'react-markdown'

import CodeMirrorEditor from './components/code-mirror-editor'
import CodeStyle from '@/common/article/code-style'
import EditTip from './components/tip'
import EditHeader from './components/edit-header'

import { markdownText } from './default'

import { useSetState } from '@/hooks/index'

import { propsRoute } from '@/typescript'

import Verify from '@/utils/verify'

import 'github-markdown-css'
import './index.less'

const verifyFunc = new Verify({}, {})

console.log(verifyFunc)
type Iprops = propsRoute

interface stateType {
    form: formType
    tagData: articleType.tagType[]
    preview: boolean
}
interface formType {
    markdown: string
    tagId: string
    title: string
    articleImg: string
}

const EditArticle: React.FC<Iprops> = (props: Iprops): JSX.Element => {
    const [state, setState] = useSetState<stateType>({
        form: {
            markdown: markdownText,
            tagId: '',
            title: '',
            articleImg: ''
        },
        tagData: [],
        preview: false
    })

    const codeMirror = useRef()
    const uploadInput = useRef()
    const editArticle = useRef()
    const previewBox = useRef()

    const editOnScroll = () => {}

    const onChange = () => {}

    const activedPreview = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {}

    const clickFile = (e: boolean) => {
        setState({
            preview: e
        })
    }

    const setInp = () => {}

    const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {}

    const removeImg = () => {}

    const selectTag = (v: articleType.tagType) => {}

    const submit = () => {}

    const { form, tagData, preview } = state

    useEffect(() => {}, [])

    return (
        <div>
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
                        id="markdownBody"
                        skipHtml={true}
                        renderers={{ code: CodeStyle }}
                        source={form.markdown}
                    ></ReactMarkdown>
                    <EditTip preview={preview} clickFile={clickFile} activedPreview={activedPreview} />
                </div>
            </div>
        </div>
    )
}

export default EditArticle
