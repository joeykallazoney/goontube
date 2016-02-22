import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { makePacket } from '../../shared/util'
import { Modal, Button, ButtonInput, ButtonGroup, ButtonToolbar, Input, Alert } from 'react-bootstrap'
import p from '../../shared/protocol'
import hash from '../../shared/hash'

function mapStateToProps(state) {
    return {
        input:          state.add.input,
        validating:     state.add.validating,
        show:           (state.room.addMediaModal === true)
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        closeButton: function() {
            dispatch({ type: p.ADD_MEDIA_MODAL_CLOSED })
        },

        onChange: function(ev) {
            dispatch({ type: p.ADD_MEDIA_INPUT, data: ev.target.value })
        },

        onHide: function() {
            dispatch({ type: p.ADD_MEDIA_MODAL_CLOSED })
        }
    }
}

class AddMediaModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="tube-modal add-media">
                <Modal {...this.props}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Media</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form className="form-horizontal add-media-form">
                            <Input type="text"
                                value={this.props.input}
                                {...this.props.username}
                                label="URL"
                                labelClassName="col-xs-4"
                                onChange={(ev) => this.props.onChange(ev)}
                                wrapperClassName="col-xs-8" />
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={(e) => this.props.closeButton()}>Close</Button>
                        <Button bsStyle={this.props.validating === false ? 'default' : 'warning'} disabled>
                            {this.props.validating === false ? 'Submit' : 'Verifying media link...'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMediaModal)
