import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import invariant from 'redux-immutable-state-invariant'
import webSocketMiddleware from './websocket'

export default applyMiddleware(
    invariant(),
    thunk,
    webSocketMiddleware
)
