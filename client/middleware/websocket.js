import { applyMiddleware, compose } from 'redux'
import { makePacket } from '../../shared/util'
import p from '../../shared/protocol'

const webSocketMiddleware = socket => {
    return store => {
        socket.onmessage = (m) => store.dispatch(JSON.parse(m.data))

        return next => action => {
            switch(action.type) {
                case p.AUTHENTICATION_ATTEMPT:
                case p.REGISTRATION_ATTEMPT:
                case p.SEND_CHAT_MESSAGE:
                case p.REQUEST_ADD_MEDIA_BY_URL:
                case p.REQUEST_DRAGNDROP_PLAYLIST_ENTRY:
                case p.PLAYLIST_EXCHANGE_REQUEST:
                case p.PLAYLIST_SHUFFLE_REQUEST:
                case p.PLAYLIST_SKIP_REQUEST:
                case p.REQUEST_DELETE_PLAYLIST_ENTRY:
                    socket.send(makePacket(action.type, action.data))

                default:
                    next(action)
            }
        }
    }
}

export default webSocketMiddleware
