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

const LayoutWrapper = (layoutProps) =>
    (Component) => {
        return class {
            render() {
                return <Component {...layoutProps} />
            }
        }
    }

class Layout extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="layout">
                {this.props.children.map(c => c)}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
