import React from 'react'
import { connect } from 'react-redux'
import { makePacket } from '../../shared/util'
import p from '../../shared/protocol'

import { Button } from 'react-bootstrap'

function mapStateToProps(state) {
    return {
        user: state.auth.user
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
                        <Button {...this.props.account}>
                            My Account
                        </Button>

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
