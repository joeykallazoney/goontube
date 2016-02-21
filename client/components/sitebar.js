import React from 'react'
import { connect } from 'react-redux'
import { makePacket } from '../../shared/util'
import p from '../../shared/protocol'

import { ButtonToolbar, MenuItem, DropdownButton, Button, Glyphicon } from 'react-bootstrap'

function mapStateToProps(state) {
    return {
        user:   state.auth.user,
        rooms:  state.app.rooms.list
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        account: {
            onClick: () => {
                dispatch({ type: p.ACCOUNT_BUTTON_CLICKED })
            }
        },
        login: {
            onClick: () => {
                dispatch({ type: p.LOGIN_CLICKED })
            }
        },
        logout: {
            onClick: () => dispatch({ type: p.REQUEST_LOGOUT, send: true })
        },
        roomItem: {
            onClick: (ev, desiredRoomName) => {
                dispatch({ type: p.REQUEST_CHANGE_ROOM, send: true, data: desiredRoomName })
            }
        }
    }
}


class SiteBar extends React.Component {
    constructor(props) {
        super(props)
    }

    renderRooms() {
        return this.props.rooms.map(
            (room, i) => <MenuItem
                onClick={(ev) => this.props.roomItem.onClick(ev, room.name)}
                key={i}
                eventKey={i}>
                <div><strong>Name:</strong> {room.name}</div>
                <div><strong>Users:</strong> {room.users}</div>
            </MenuItem>)
    }

    render() {
        return (
            <div className="sitebar">
                <ButtonToolbar>
                    {null !== this.props.user ? (
                        <div className="logged-in">
                            <DropdownButton title="Goontu.be" id="bg-nested-dropdown">
                                {this.renderRooms()}
                            </DropdownButton>
                            <Button {...this.props.account}>
                                <Glyphicon glyph="cog" /> Settings
                            </Button>
                            <Button className="logout" {...this.props.logout}>
                                <Glyphicon glyph="log-out" /> Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="logged-in">
                            <Button className="logout" {...this.props.login}>
                                <Glyphicon glyph="log-in" /> Login
                            </Button>
                        </div>
                    )}
                </ButtonToolbar>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteBar)
