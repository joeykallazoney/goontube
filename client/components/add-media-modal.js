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
        validated:      state.add.validated,
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

        onSubmit: function(ev, input) {
            ev.preventDefault()
            ev.stopPropagation()

            dispatch({
                type: p.REQUEST_ADD_MEDIA_BY_URL,
                send: true,
                data: input
            })
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

                    <form onSubmit={(ev) => this.props.onSubmit(ev, this.props.input)} className="form-horizontal add-media-form">
                        <Modal.Body>
                            <Input type="text"
                                value={this.props.input}
                                {...this.props.username}
                                label="URL"
                                labelClassName="col-xs-4"
                                onChange={(ev) => this.props.onChange(ev)}
                                wrapperClassName="col-xs-8" />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={(e) => this.props.closeButton()}>Close</Button>
                            <Button type="submit" bsStyle={this.props.validating === false ? (this.props.validated === true ? 'success' : 'default') : 'warning'} disabled={!this.props.validated}>
                                {this.props.validating === false ? 'Submit' : 'Verifying media link...'}
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMediaModal)
