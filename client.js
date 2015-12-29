/**
 * @file Provides an entry point for the client script bundle.
 * @since 1.0.0
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Goontube from './components/app'

window.addEventListener('load', function load(event) {
    let origin = document.getElementById('origin')

    if(origin === null) {
        origin = document.createElement('div')
        origin.id = 'origin'

        document.body.appendChild(origin)
    }

    ReactDOM.render(<Goontube />, origin)
    window.removeEventListener('load', load, false)
}, false)
