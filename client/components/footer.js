import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        footerCols: state.layout.footer.width
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Col xs={this.props.footerCols}>
                <footer>
                    <div className="footer-info">
                        Goontube created with ❤︎ and JavaScript.
                    </div>
                </footer>
            </Col>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
