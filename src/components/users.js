import React from 'react'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        users:  state.getIn(['rooms', 'users'])
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
        return (
            <div className="user-list">
                {this.props.users.map(user => (
                    <li key={user.username} className="user">{user.username}</li>
                ))}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
