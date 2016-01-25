/**
 * @module Exports a React component class abstracting the app layout.
 * @since 1.0.0
 */
import React from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'

class Layout extends React.Component {
    constructor(props, context) {
        super(props, context)
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
