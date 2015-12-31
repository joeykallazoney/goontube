import React from 'react'
import ReactDOM from 'react-dom'

import Users from './users'

class Chat extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            buffer: []
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="chat">
                <ul className="chat-list">
                {this.state.buffer.map((message) =>
                    (
                        <li key={message.id} className="message">
                            <span className="from">{message.from}</span>
                            <div className="body">{message.body}</div>
                        </li>
                    )
                )}
                </ul>

                <Users />
            </div>
        )
    }
}

Chat.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default Chat
