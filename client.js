/**
 * @file Provides an entry point for the client script bundle.
 * @since 1.0.0
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Goontube from './components/app'

import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import rootReducer from './reducers'

window.addEventListener('load', function load(event) {
    let origin = document.getElementById('origin')

    if(origin === null) {
        origin = document.createElement('div')
        origin.id = 'origin'

        document.body.appendChild(origin)
    }

    let store = createStore(rootReducer)

    ReactDOM.render(
        <Provider store={store}>
            <Goontube />
        </Provider>,
        origin)
    window.removeEventListener('load', load, false)
}, false)
