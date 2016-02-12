import React from 'react'
import { connect } from 'react-redux'
import { makePacket } from '../util'
import p from '../protocol'

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
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
                        Currently logged in as {this.props.user},

                        <span className="logout" {...this.props.logout}>
                            [ click here to log-out ]
                        </span>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteBar)
