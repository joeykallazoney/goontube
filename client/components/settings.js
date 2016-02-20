import React from 'react'
import { connect } from 'react-redux'
import { makePacket } from '../../shared/util'
import { Button, Modal, Grid, Col, Row, Input, Alert } from 'react-bootstrap'
import p from '../../shared/protocol'

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    }
}

class Settings extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>Settings </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
