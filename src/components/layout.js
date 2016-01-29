/**
 * @module Exports a React component class abstracting the app layout.
 * @since 1.0.0
 */
import React from 'react'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    }
}

class Layout extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="layout">
                {this.props.children}
            </div>
        )
    }
}

Layout.mixins = [PureRenderMixin]

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
