/**
 * @file Provides an entry point for the client script bundle.
 * @since 1.0.0
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Goontube from './components/app'

import hash from './hash'

import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import rootReducer from './reducers'

function initWebSocket(store) {
    let socket = new WebSocket('ws://localhost:7070')

    socket.onopen = () => {
        console.log('Connection established to WebSocket server.')
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

    let store = createStore(rootReducer)
    let socket = initWebSocket(store)

    ReactDOM.render(
        <Provider store={store}>
            <Goontube />
        </Provider>,
        origin)
    window.removeEventListener('load', load, false)
}, false)
