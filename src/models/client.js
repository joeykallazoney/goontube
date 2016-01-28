import p from '../protocol'
import { makePacket } from '../util'
import { MD5, enc } from 'crypto-js'
import hash from '../hash'

/**
 * @class Models instances of individual client sessions.
 * @since 1.0.0
 */
class Client {
    teardown() {
    }

    sendPacket(type, data) {
        this.socket.send(makePacket(type, data))
    }

    closeWithReason(message) {
        this.sendPacket(
            p.DISCONNECTED_WITH_REASON,
            message
        )

        this.close()
    }

    close() {
        if(null !== this.socket)
            this.socket.close()
    }

    login(username, password) {
        console.log(username)
        console.log(password)
    }

    constructor(socket, ctx) {
        this.serverContext  = ctx
        this.socket         = socket
        this.address        = socket._socket.address()
        this.user           = null
    }
}

export default Client
