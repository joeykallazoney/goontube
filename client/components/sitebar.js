import React from 'react'
import { connect } from 'react-redux'
import { makePacket } from '../../shared/util'
import p from '../../shared/protocol'

import { ButtonToolbar, MenuItem, DropdownButton, Button, Glyphicon } from 'react-bootstrap'

function mapStateToProps(state) {
    return {
        user:   state.auth.user,
        rooms:  state.app.rooms
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
            onClick: () => dispatch({ type: p.REQUEST_LOGOUT })
        }
    }
}


class SiteBar extends React.Component {
    constructor(props) {
        super(props)
    }

    renderRooms() {
        const rooms = this.props.rooms.list
        return rooms.map((room, i) => (
            <MenuItem eventKey={i}>{room.name}</MenuItem>
        ))
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
