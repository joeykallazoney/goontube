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
        let lastRoomHistory = this.context.store
            .getState()
            .get('room')
            .history

        this.context.store.subscribe(() => {
            if(lastRoomHistory !== this.context.store
                .getState()
                .get('room').history) {

                console.log(lastRoomHistory)
                console.log(this.context.store
                    .getState()
                    .get('room').history)
                this.forceUpdate()
            }
        })
    }

    render() {
        let currentRoomChatHistory = this.context.store.getState().get('room').history

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
