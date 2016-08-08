import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { makePacket } from '../../shared/util'
import { Glyphicon, Modal, Button, Well, ButtonInput, ButtonGroup, ButtonToolbar, Input, Alert } from 'react-bootstrap'
import p from '../../shared/protocol'
import hash from '../../shared/hash'

function mapStateToProps(state) {
    return {
        input:              state.add.input,
        startAt:            state.add.startAt,
        feedbackDuration:   state.add.feedback.duration,
        feedback:           state.add.feedback.message,
        latestKey:          state.add.feedback.token,
        validated:          state.add.validated,
        validating:         state.add.validating,
        show:               (state.room.addMediaModal === true)
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        closeButton: function() {
            dispatch({ type: p.ADD_MEDIA_MODAL_CLOSED })
        },

        closeButton: function() {
            dispatch({ type: p.ADD_MEDIA_MODAL_CLOSED })
        },

        onStartPosChange: function(ev) {
            ev.preventDefault()
            ev.stopPropagation()

            dispatch({ type: p.SET_START_AT, data: ev.target.value })
        },

        onChange: function(ev) {
            ev.preventDefault()
            ev.stopPropagation()

            dispatch({ type: p.ADD_MEDIA_INPUT, data: ev.target.value })
        },

        onSubmit: function(ev, input, key, startAt) {
            ev.preventDefault()
            ev.stopPropagation()

            dispatch([
                {
                    type: p.REQUEST_ADD_MEDIA_BY_KEY,
                    send: true,
                    data: {
                        key:        key,
                        startAt:    startAt
                    }
                },
                { type: p.ADD_MEDIA_MODAL_CLOSED }
            ])
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

    renderStartTime(t) {
        const secs = parseInt(t / 1000 % 60)
        const mins = parseInt((t / (1000 * 60)) % 60)
        const hours = parseInt((t / (1000 * 60 * 60)) % 24)

        if(0 === t) {
            return 'the beginning'
        } else {
            if(hours) {
                return `${hours} hours, ${mins} minutes, ${secs} seconds`
            } else {
                if(mins) {
                    return `${mins} minutes, ${secs} seconds`
                } else {
                    return `${secs} seconds`
                }
            }
        }
    }

    renderFeedback() {
        return (
            <div>
                <Well>
                {this.props.feedback}
                </Well>

                {this.props.validated === true ? (
                    <div>
                        <label htmlFor="start-pos">Start playback at {this.renderStartTime(this.props.startAt)}:</label>
                        <input onChange={(ev) => this.props.onStartPosChange(ev)} id="start-pos" type="range" value={this.props.startAt} max={this.props.feedbackDuration - 1000}/>
                    </div>
                ) : <div className="not-validated"></div>}
            </div>

        )
    }

    render() {
        return (
            <div className="tube-modal add-media">
                <Modal {...this.props}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Media</Modal.Title>
                    </Modal.Header>

                    <form onSubmit={(ev) => this.props.onSubmit(ev, this.props.input, this.props.latestKey, this.props.startAt)} className="form-horizontal add-media-form">
                        <Modal.Body>
                            <Input type="text"
                                value={this.props.input}
                                {...this.props.username}
                                label="URL"
                                labelClassName="col-xs-4"
                                onChange={(ev) => this.props.onChange(ev)}
                                wrapperClassName="col-xs-8" />
                            {this.props.feedback && this.props.input ? (this.renderFeedback()) : (<div></div>)}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={(e) => this.props.closeButton()}>Close</Button>
                            <Button type="submit" bsStyle={this.props.validating === false ? (this.props.validated === true ? 'success' : 'default') : 'warning'} disabled={!this.props.validated}>
                                {this.props.validating === false ? (<span>{this.props.validated === true ? <Glyphicon glyph="ok" /> : <span />} Submit</span>) : (<span><Glyphicon className="spinning" glyph="refresh" /><span> Verifying media link...</span></span>)}
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMediaModal)
