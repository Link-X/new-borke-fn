/* eslint-disable */

import React, { PureComponent } from 'react'
const elements: any = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6'
}

function Heading({ level, children, ...props }: any) {
    return React.createElement(elements[level] || elements.h1, props, children)
}

Heading.defaultProps = {
    type: 'h1'
}

class HeadingBlock extends PureComponent {
    renderHtml = () => {
        const { level, children } = this.props as any

        if (children && children.length > 0) {
            const nodeValue = children[0].props.value
            return (
                <Heading level={`h${level}`} id={nodeValue}>
                    <span className="title">{children}</span>
                </Heading>
            )
        } else {
            return <React.Fragment>{children}</React.Fragment>
        }
    }
    render() {
        return <React.Fragment>{this.renderHtml()}</React.Fragment>
    }
}

export default HeadingBlock
