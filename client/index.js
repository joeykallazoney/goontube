/**
 * @file Provides an entry point for the client script bundle.
 * @since 1.0.0
 */
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import Goontube from './components/app'
import { createStore, applyMiddleware, compose } from 'redux'
import { connect, Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { makePacket } from '../shared/util'
import hash from '../shared/hash'
import p from '../shared/protocol'
import reducer from './reducers'
import rootSaga from './sagas'
import middleware from './middleware'
import webSocketMiddleware from './middleware/websocket'

const sagaMiddleware = createSagaMiddleware()
const finalCreateStore = compose(
    ...[...middleware, sagaMiddleware],
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

window.addEventListener('load', function load(event) {
    let origin = document.getElementById('origin')
    if(origin === null) {
        origin = document.createElement('div')
        origin.id = 'origin'

        document.body.appendChild(origin)
    }

    let store = finalCreateStore(reducer)
    sagaMiddleware.run(rootSaga)

    ReactDOM.render(
        <Provider store={store}>
            <Goontube />
        </Provider>,
        origin)
    window.removeEventListener('load', load, false)
}, false)
