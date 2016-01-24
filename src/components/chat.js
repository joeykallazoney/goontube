import React from 'react'
import ReactDOM from 'react-dom'

import Users from './users'

let ChatMessage = (props) => (
    <li className="message">
        <span className="from">{props.from}</span>
        <div className="body">{props.body}</div>
    </li>
)

class Chat extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
    }

    render() {
        const currentRoomChatHistory = this.context.store.getState().get('room').history

        return (
            <div className="chat">
                <ul className="chat-list">
                {currentRoomChatHistory.map((message) =>
                    <ChatMessage key={message.id} from={message.from} body={message.body} />
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
