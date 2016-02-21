import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Grid, Col, Row } from 'react-bootstrap'

import Users from './users'
import { makePacket } from '../../shared/util'
import p from '../../shared/protocol'

const KEYCODE_ENTER = 13

function mapStateToProps(state) {
    return {
        heightBase:         state.layout.heightbase,
        chatWidth:          state.layout.chat.width,
        chatHeightUnits:    state.layout.chat.height,
        chatUsersWidth:     state.layout.chatUsers.width,
        chatListWidth:      state.layout.chatList.width,
        chatInput:          state.chat.input,
        history:            state.room.history
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        sendChat: (ev, msg) => {
            ev.preventDefault()
            dispatch({ type: p.SEND_CHAT_MESSAGE, send: true, data: msg })
            setTimeout(() => dispatch({ type: p.SET_CHAT_INPUT, data: ''}), 50)
        },
        chatInputChanged: (ev, value) => {
            dispatch({ type: p.SET_CHAT_INPUT, data: value })
        }
    }
}

const SystemMessage = (props) => <li {...props} className="system message">
        <div className="body">{props.message}</div>
    </li>

const ChatMessage = (props) => {
    return <li {...props} className="message">
        <span className="from">{props.from}:</span> <div className="body">{props.body}</div>
    </li>
}

class ChatHistory extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUpdate() {
        let el = this.refs.chatList

        this.shouldScrollBottom = el.scrollTop + el.offsetHeight === el.scrollHeight
    }

    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            let el = this.refs.chatList

            el.scrollTop = el.scrollHeight
        }
    }

    renderChat() {
        console.log(this.props.history)
        return this.props.history.map(
            (message) => message.system === true ?
                <SystemMessage {...this.props} system={true} message={message.message} /> :
                <ChatMessage {...this.props} key={message.id} from={message.from} body={message.body} />
        )
    }

    render() {
        return (
            <ul ref="chatList" style={{height: ((this.props.chatHeightUnits - 1) * this.props.heightBase) + 'px'}} className="chat-list">
            {this.renderChat()}
            </ul>
        )
    }
}

class ChatInput extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div {...this.props.style} className="chat-input">
                <form onSubmit={(ev, msg) => this.props.sendChat(ev, this.props.chatInput)}>
                    <input style={{width: '100%', height: (1 * this.props.heightBase) + 'px'}}
                        type="text"
                        value={this.props.chatInput}
                        onChange={(e) => this.props.chatInputChanged(e, e.target.value)} />
                </form>
            </div>
        )
    }
}

class Chat extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <Col xs={this.props.chatWidth}>
                <div className="chat">
                    <Grid fluid>
                        <Row>
                            <Col xs={this.props.chatListWidth}>
                                <ChatHistory {...this.props} />
                            </Col>
                            <Col xs={this.props.chatUsersWidth}>
                                <Users />
                            </Col>
                        </Row>
                        <Row>
                            <ChatInput {...this.props} />
                        </Row>
                    </Grid>
                </div>
            </Col>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
