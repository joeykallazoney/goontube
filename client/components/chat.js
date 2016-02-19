import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Users from './users'
import { makePacket } from '../../shared/util'
import p from '../../shared/protocol'

const KEYCODE_ENTER = 13

function mapStateToProps(state) {
    return {
        chatInput: state.chat.input,
        history: state.room.history
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        sendChat: (ev, msg) => {
            ev.preventDefault()
            dispatch({ type: p.SEND_CHAT_MESSAGE, data: msg })
            setTimeout(() => dispatch({ type: p.SET_CHAT_INPUT, data: ''}), 50)
        },
        chatInputChanged: (ev, value) => {
            dispatch({ type: p.SET_CHAT_INPUT, data: value })
        }
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

    render() {
        return (
            <div className="chat-input">
                <form onSubmit={(ev, msg) => this.props.sendChat(ev, this.props.chatInput)}>
                    <input type="text"
                        value={this.props.chatInput}
                        onChange={(e) => this.props.chatInputChanged(e, e.target.value)} />
                </form>
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
                <ChatInput {...this.props} />
                <Users />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
