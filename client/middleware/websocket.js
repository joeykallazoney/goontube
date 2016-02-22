import { applyMiddleware, compose } from 'redux'
import { makePacket } from '../../shared/util'
import p from '../../shared/protocol'

const webSocketMiddleware = store => {
    let socket = new WebSocket(`ws://${window.location.hostname}:7070`)
    socket.onmessage = (m) => store.dispatch(JSON.parse(m.data))

    return next => action => {
        if('undefined' !== typeof action.send && true === action.send)
            socket.send(makePacket(action.type, action.data))
        next(action)
    }
}

export default webSocketMiddleware
