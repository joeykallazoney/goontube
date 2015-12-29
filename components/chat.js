import React from 'react'
import ReactDOM from 'react-dom'

class Chat extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            buffer: []
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="chat">
                {this.state.buffer.map((message) =>
                    (
                        <li key={message.id} className="message">
                            <span className="from">{message.from}</span>
                            <div className="body">{message.body}</div>
                        </li>
                    )
                )}
            </div>
        )
    }
}

export default Chat
