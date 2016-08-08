import multi from 'redux-multi'
import thunk from 'redux-thunk'
import webSocketMiddleware from './websocket'

export default [
    multi,
    thunk,
    webSocketMiddleware
]
