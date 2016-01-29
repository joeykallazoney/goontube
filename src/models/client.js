import p from '../protocol'
import { makePacket } from '../util'
import hash from '../hash'
import User from './user'

/**
 * @class Models instances of individual client sessions.
 * @since 1.0.0
 */
class Client {
    teardown() {
    }

    sendPacket(type, data = {}) {
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
        let user = new User(this.serverContext)
            .loadByUsername(username)
            .then(
                (u) => {
                    if(u.authenticate(password)) {
                        this.user = u
                        console.log(u)
                        this.sendPacket(
                            p.LOGIN_ACCEPTED,
                            { username: username }
                        )
                    } else {
                        this.sendPacket(p.LOGIN_DENIED_BAD_DETAILS)
                    }
                },
                (err) => {
                    console.log(`Failed to authenticate: ${err.toString()}`)
                })
    }

    constructor(socket, serverContext) {
        this.serverContext  = serverContext
        this.socket         = socket
        this.address        = socket._socket.address()
        this.user           = null
    }
}

export default Client
