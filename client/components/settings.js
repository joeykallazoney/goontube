import React, { Component } from 'react'
import { connect } from 'react-redux'
import ColorPicker from 'react-color'
import { makePacket } from '../../shared/util'
import { Button, Modal, Grid, Col, Row, Input, Alert } from 'react-bootstrap'
import p from '../../shared/protocol'

function mapStateToProps(state) {
    return {
        fluid:                  state.layout.fluid,
        playerWidth:            state.layout.player.width,
        show:                   (state.app.settingsModal === true),
        showBanner:             state.settings.showBanner,
        showPlayer:             state.settings.showPlayer,
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

        setPlayerWidth(cols) {
            dispatch({ type: p.SET_PLAYER_WIDTH, data: cols })
        },

        setSiteBarBg(bgColor) {
            dispatch({ type: p.SET_SITEBAR_BG_COLOR, data: bgColor })
        },

        toggleBanner: function() {
            dispatch({ type: p.TOGGLE_BANNER })
        },

        toggleFluid: function() {
            dispatch({ type: p.TOGGLE_FLUID })
        },

        togglePlayer: function() {
            dispatch({ type: p.TOGGLE_PLAYER })
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
                                <div className="form-group">
                                    <div className="control-label col-xs-5">
                                        <label htmlFor="fluid">Fluid Mode</label>
                                    </div>
                                    <div className="col-xs-7">
                                        <Input
                                            type="checkbox"
                                            id="fluid"
                                            checked={this.props.fluid}
                                            label="Allow app to span full wide"
                                            onChange={() => this.props.toggleFluid()} />
                                    </div>
                                </div>
                            </div>
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
                            <div>
                                <div className="form-group">
                                    <div className="control-label col-xs-5">
                                        <label htmlFor="showbanner">Show Banner Images</label>
                                    </div>
                                    <div className="col-xs-7">
                                        <Input
                                            type="checkbox"
                                            id="showbanner"
                                            checked={this.props.showBanner}
                                            label="Show Banner Images"
                                            onChange={() => this.props.toggleBanner()} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="form-group">
                                    <div className="control-label col-xs-5">
                                        <label htmlFor="showplayer">Player</label>
                                    </div>
                                    <div className="col-xs-7">
                                        <Input
                                            type="checkbox"
                                            id="showplayer"
                                            label="Enable Player"
                                            checked={this.props.showPlayer}
                                            onChange={() => this.props.togglePlayer()} />
                                    </div>

                                    <div className="control-label col-xs-5">
                                        <label htmlFor="playercols">Player Width</label>
                                    </div>
                                    <div className="col-xs-7">
                                        <input
                                            id="playercols"
                                            type="range"
                                            label="Width"
                                            value={this.props.playerWidth}
                                            min={1}
                                            max={12}
                                            onChange={(ev) => this.props.setPlayerWidth(ev.target.value)} />
                                    </div>
                                </div>
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
