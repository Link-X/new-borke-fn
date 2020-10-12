/* eslint-disable */

import hljs from 'highlight.js/lib/core'
import sql from 'highlight.js/lib/languages/sql'
import htmlbars from 'highlight.js/lib/languages/htmlbars'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import stylus from 'highlight.js/lib/languages/stylus'
import json from 'highlight.js/lib/languages/json'
import javascript from 'highlight.js/lib/languages/javascript'
const React = require('react')

import 'highlight.js/styles/github.css'

console.log(hljs)
const languageData: any = {
    sql: sql,
    htmlbars: htmlbars,
    css: css,
    javascript: javascript,
    xml: xml,
    stylus: stylus,
    json: json
}
Object.keys(languageData).forEach((v) => {
    hljs.registerLanguage(v, languageData[v])
})

class CodeStyle extends React.PureComponent {
    constructor(props: any) {
        super(props)
        this.setRef = this.setRef.bind(this)
    }

    setRef(el: any) {
        this.codeEl = el
    }

    componentDidMount() {
        this.highlightCode()
    }

    componentDidUpdate() {
        this.highlightCode()
    }

    highlightCode() {
        hljs.highlightBlock(this.codeEl)
    }

    render() {
        return (
            <pre>
                <code ref={this.setRef} className={`language-${this.props.language}`}>
                    {this.props.value}
                </code>
            </pre>
        )
    }
}

CodeStyle.defaultProps = {
    language: ''
}

export default CodeStyle
