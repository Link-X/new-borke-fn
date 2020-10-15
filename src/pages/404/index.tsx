import React from 'react'

import './index.less'

const PageNull: React.FC<any> = (): JSX.Element => {
    return (
        <div className="notpage">
            <div className="number">404</div>
            <div className="text">
                <span>页面跑到火星去了...</span>
                <br />
                别急，这个页面正在建设中！
            </div>
        </div>
    )
}

export default PageNull
