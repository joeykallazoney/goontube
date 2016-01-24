import React from 'react'
import ReactDOM from 'react-dom'

import Users from './users'

let ChatMessage = (props) =>
    <li className="message">
        <span className="from">{props.from}</span>
        <div className="body">{props.body}</div>
    </li>

class Chat extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        let lastRoomHistory = this.context.store
            .getState()
            .getIn(['room', 'history'])
        this.context.store.subscribe(() => {
            let currentHistory = this.context.store
                .getState()
                .getIn(['room', 'history'])
            if(lastRoomHistory !== currentHistory) {
                lastRoomHistory = currentHistory

                this.forceUpdate()
            }
        })
    }

    render() {
        let history = this.context.store.getState().getIn(['room', 'history']).toArray()

        return (
            <div className="chat">
                <ul className="chat-list">
                {
                    history.map((message) =>
                        <ChatMessage key={message.id} from={message.from} body={message.body} />
                    )
                }
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
