// Component that allows users to search for videos and add them directly.

import React from 'react'
import ReactDOM from 'react-dom'

import { makePacket } from '../util'
import p from '../protocol'

/*
let ChatMessage = (props) =>
    <li className="message">
        <span className="from">{props.from}</span>
        <div className="body">{props.body}</div>
    </li>
    */

class Search extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
    
    }

    /*
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
    */

    render() {
        return (
            <div className="search">
            </div>
        )
    }
}

export default Search
