/**
 * @file Provides an entry point for the client script bundle.
 * @since 1.0.0
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Goontube from './components/app'
import { createStore, applyMiddleware, compose } from 'redux'
import { connect, Provider } from 'react-redux'

import { makePacket } from '../shared/util'
import hash from '../shared/hash'
import p from '../shared/protocol'
import reducer from './reducers'
import middleware from './middleware'

const finalCreateStore = compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

function initWebSocket(store) {
    let socket = new WebSocket(`ws://${window.location.hostname}:7070`)

    socket.onopen = () => {
    }

    socket.onmessage = (message) => {
        let decoded = JSON.parse(message.data)
        store.dispatch(decoded)
    }

    socket.onclose = () => {
        console.error('Lost connection to WebSocket server!')
    }

    return socket
}

window.addEventListener('load', function load(event) {
    let origin = document.getElementById('origin')

    if(origin === null) {
        origin = document.createElement('div')
        origin.id = 'origin'

        document.body.appendChild(origin)
    }

    let store = finalCreateStore(reducer)
    let socket = initWebSocket(store)

    ReactDOM.render(
        <Provider store={store}>
            <Goontube socket={socket} />
        </Provider>,
        origin)
    window.removeEventListener('load', load, false)
}, false)
