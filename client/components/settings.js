import React, { Component } from 'react'
import { connect } from 'react-redux'
import ColorPicker from 'react-color'
import { makePacket } from '../../shared/util'
import { Button, Modal, Grid, Col, Row, Input, Alert } from 'react-bootstrap'
import p from '../../shared/protocol'

function mapStateToProps(state) {
    return {
        show:                   (state.app.settingsModal === true),
        showSiteBarBgPicker:    state.settings.showSiteBarBgPicker,
        siteBarBg:              state.settings.siteBarStyles.backgroundColor,
        showBackgroundPicker:   state.settings.showBackgroundPicker,
        bodyBackground:         state.settings.bodyStyles.backgroundColor
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        sitebarBgPicker: {
            display: function() {
                dispatch({ type: p.SHOW_SITEBAR_BG_PICKER })
            },
            handleClick: function() {
                if(props.showBackgroundPicker) {
                    dispatch({ type: p.HIDE_SITEBAR_BG_PICKER })
                } else {
                    dispatch({ type: p.SHOW_SITEBAR_BG_PICKER })
                }
            },
            handleClose: function() {
                dispatch({ type: p.HIDE_SITEBAR_BG_PICKER })
            }
        },

        bodyBackgroundPicker: {
            display: function() {
                dispatch({ type: p.SHOW_BODY_BG_PICKER })
            },
            handleClick: function() {
                if(props.showBackgroundPicker) {
                    dispatch({ type: p.HIDE_BODY_BG_PICKER })
                } else {
                    dispatch({ type: p.SHOW_BODY_BG_PICKER })
                }
            },
            handleClose: function() {
                dispatch({ type: p.HIDE_BODY_BG_PICKER })
            }
        },

        closeButton: function() {
            dispatch({ type: p.SETTINGS_MODAL_CLOSED })
        },

        setBodyBackground(bgColor) {
            dispatch({ type: p.SET_BODY_BG_COLOR, data: bgColor })
        },

        setSiteBarBg(bgColor) {
            dispatch({ type: p.SET_SITEBAR_BG_COLOR, data: bgColor })
        },

        onHide: function() {
            dispatch({ type: p.HIDE_BODY_BG_PICKER })
            dispatch({ type: p.SETTINGS_MODAL_CLOSED })
            dispatch({ type: p.HIDE_SITEBAR_BG_PICKER })
        }
    }
}

class SettingsModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="tube-modal settings-modal">
                <Modal {...this.props}>
                    <Modal.Header closeButton>
                        <Modal.Title>Settings</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form className="form-horizontal add-media-form">
                            <div>
                                <Input
                                    label="Sitebar Color"
                                    labelClassName="col-xs-5"
                                    type="text"
                                    value={this.props.siteBarBg}
                                    onChange={c => this.props.setSiteBarBg(c.target.value)}
                                    onClick={() => this.props.sitebarBgPicker.handleClick()}
                                    wrapperClassName="col-xs-7" />
                                <ColorPicker
                                    position="below"
                                    color={this.props.siteBarBg}
                                    display={this.props.showSiteBarBgPicker}
                                    onChange={c => this.props.setSiteBarBg('#' + c.hex)}
                                    onClose={(c) => this.props.sitebarBgPicker.handleClose()}
                                    type="chrome" />
                            </div>
                            <div>
                                <Input
                                    label="Background Color"
                                    labelClassName="col-xs-5"
                                    type="text"
                                    onChange={c => this.props.setBodyBackground(c.target.value)}
                                    onClick={() => this.props.bodyBackgroundPicker.handleClick()}
                                    value={this.props.bodyBackground}
                                    wrapperClassName="col-xs-7" />
                                <ColorPicker
                                    position="below"
                                    color={this.props.bodyBackground}
                                    display={this.props.showBackgroundPicker}
                                    onChange={c => this.props.setBodyBackground('#' + c.hex)}
                                    onClose={(c) => this.props.bodyBackgroundPicker.handleClose()}
                                    type="chrome" />
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={(e) => this.props.closeButton()}>Close</Button>
                        <Button disabled>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal)
