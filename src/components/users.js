import React from 'react'
import ReactDOM from 'react-dom'

class Users extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="user-list">
            </div>
        )
    }
}

Users.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default Users
