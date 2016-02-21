import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
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
            <footer>
                <div className="footer-info">
                    Lorem ipsum dolor sit amet.  Goontube created with ❤︎ and JavaScript.
                </div>
            </footer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
