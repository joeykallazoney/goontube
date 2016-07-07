import { applyMiddleware, compose } from 'redux'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import invariant from 'redux-immutable-state-invariant'
import webSocketMiddleware from './websocket'

export default applyMiddleware(
    invariant(),
    multi,
    thunk,
    webSocketMiddleware
)
