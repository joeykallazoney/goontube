/**
 * @file Provides an entry point for the client script bundle.
 * @since 1.0.0
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Goontube from './components/app'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import invariant from 'redux-immutable-state-invariant'
import { connect, Provider } from 'react-redux'

import { makePacket } from './util'
import hash from './hash'
import p from './protocol'
import rootReducer from './reducers'

const finalCreateStore = compose(
    applyMiddleware(invariant(), thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

function initWebSocket(store) {
    let socket = new WebSocket('ws://localhost:7070')

    socket.onopen = () => {
        console.log('Connection established to WebSocket server.')
        socket.send(makePacket(p.CLIENT_HELLO, 'Test string'))
    }

    socket.onmessage = (message) => {
        let decoded = JSON.parse(message.data)

        console.log(`${decoded.type} -> ${decoded.data} dispatched to Redux store.`)
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

    let store = finalCreateStore(rootReducer)
    let socket = initWebSocket(store)

    ReactDOM.render(
        <Provider store={store}>
            <Goontube socket={socket} />
        </Provider>,
        origin)
    window.removeEventListener('load', load, false)
}, false)
