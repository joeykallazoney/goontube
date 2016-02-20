import React from 'react'
import { Col } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        heightBase:             state.layout.heightbase,
        contentPaneWidth:        state.layout.contentPane.width,
        contentPaneHeightUnits:  state.layout.contentPane.height,
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

class ContentPane extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Col xs={this.props.contentPaneWidth}>
                <div style={{height: (this.props.contentPaneHeightUnits * this.props.heightBase) + 'px'}} className="content-pane">
                    Some kind of content here?  Rules?  A poll?  Another activity.
                </div>
            </Col>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPane)
