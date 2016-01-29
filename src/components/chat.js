import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Users from './users'
import { makePacket } from '../util'
import p from '../protocol'

const KEYCODE_ENTER = 13

function mapStateToProps(state) {
    return {
        history: state.getIn(['room', 'history']).toArray()
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    }
}

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

            try {
                this.props.socket.send(makePacket(
                    p.SEND_CHAT_MESSAGE,
                    chatInputValue
                ))
            } catch(e) {
                console.log('Failed to send chat message to the server.')
            }

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

    render() {
        return (
            <div className="chat">
                <ChatHistory history={this.props.history} />
                <ChatInput socket={this.props.socket} />
                <Users />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
