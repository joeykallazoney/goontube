/**
 * @module Exports a React component class abstracting the app layout.
 * @since 1.0.0
 */
import React from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'

import Banner from './banner'
import Chat from './chat'
import Users from './users'
import Playlist from './playlist'
import ContentPane from './content-pane'

class Layout extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            layout: {}
        }
    }

    render() {
        return (
            /*
             * RGL needs some updating and its author its aware.
             <ReactGridLayout className="layout" layout={this.state.layout}>
            </ReactGridLayout>
            * RGL will probably be merged into react-draggable.
            */
            <div className="layout">
                {this.props.children}
            </div>
        )
    }
}

Layout.contextTypes = {
    store: React.PropTypes.object.isRequired
}

Layout.mixins = [PureRenderMixin]

export default Layout
