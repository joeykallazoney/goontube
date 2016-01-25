import React from 'react'
import ReactDOM from 'react-dom'

import Users from './users'

const KEYCODE_ENTER = 13

let ChatMessage = (props) =>
    <li className="message">
        <span className="from">{props.from}</span>
        <div className="body">{props.body}</div>
    </li>

let ChatHistory = (props) =>
    <div className="chat-list">
    {
        props.history.map((message) =>
            <ChatMessage key={message.id} from={message.from} body={message.body} />
        )
    }
    </div>

class ChatInput extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    onKeyDown(event) {
        let nativeEvent = event.nativeEvent

        if(KEYCODE_ENTER === nativeEvent.keyCode) {
            let chatInputValue = this.refs.chatInput.value

            console.log(chatInputValue)
            this.refs.chatInput.value = ''
        }
    }

    render() {
        return (
            <div className="chat-input">
                <input ref="chatInput" type="text" onKeyDown={(e) => this.onKeyDown(e)} />
            </div>
        )
    }
}

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
                <ChatHistory history={history} />
                <ChatInput socket={this.props.socket} />
                <Users />
            </div>
        )
    }
}

Chat.contextTypes = {
    store:  React.PropTypes.object.isRequired
}

export default Chat
