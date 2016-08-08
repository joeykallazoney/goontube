import React from 'react'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        users: state.room.users,
        heightBase:         state.layout.heightbase,
        chatHeightUnits:    state.layout.chat.height
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    }
}

class Users extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        let c = 0

        return (
            <div style={{height: ((this.props.chatHeightUnits - 1) * this.props.heightBase) + 'px'}} className="user-list">
                {this.props.users.map(user => (
                    <div key={c++} className="user">{user.username}</div>
                ))}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
