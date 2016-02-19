import React from 'react'
import { connect } from 'react-redux'
import { makePacket } from '../util'
import p from '../protocol'

import { Button } from 'react-bootstrap'

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        login: {
            onClick: () => {
                dispatch({ type: p.LOGIN_CLICKED })
            }
        },
        logout: {
            onClick: () => props.socket.send(makePacket(p.LOGOUT_USER))
        }
    }
}

class SiteBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="sitebar">
                {null !== this.props.user ? (
                    <div className="logged-in">
                        <Button className="logout" {...this.props.logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="logged-in">
                        <Button className="logout" {...this.props.login}>
                            Login
                        </Button>
                    </div>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteBar)
