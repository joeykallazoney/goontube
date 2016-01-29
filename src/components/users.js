import React from 'react'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        users: state.getIn(['room', 'users'])
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
            <div className="user-list">
                {this.props.users.map(user => (
                    <div key={c++} className="user">{user.username}</div>
                ))}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
