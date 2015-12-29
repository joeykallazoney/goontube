import React from 'react'
import ReactDOM from 'react-dom'
import Goontube from './components/app'

window.addEventListener('load', function load(event) {
    let origin = document.getElementById('origin')

    if(origin !== null) {
        ReactDOM.render(<Goontube />, origin)
    }

    window.removeEventListener('load', load, false)
}, false)
