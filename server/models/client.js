import p from '../../shared/protocol'
import { makePacket } from '../../shared/util'
import hash from '../../shared/hash'
import User from './user'

/**
 * @class Models instances of individual client sessions.
 * @since 1.0.0
 */
class Client {
    teardown() {
        if(this.room) {
            this.room.removeUser(this)
        }
    }

    sendPacket(type, data = {}) {
        this.socket.send(makePacket(type, data))
    }

    sendSystemMessage(message) {
        this.sendPacket(p.SYSTEM_MESSAGE, message)
    }

    sendResultMessage(message) {
	this.sendPacket(p.RESULT_MESSAGE, message)
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
        console.log(`Login attempt: ${username}/${password}`)

        if(null === username
            || null === password
            || username.length < 3
            || !password.length) {
            this.sendPacket(p.LOGIN_DENIED_BAD_DETAILS)
            return
        }

        let user = new User(this.serverContext)
            .loadByUsername(username)
            .then(
                (u) => {
                    if(u.authenticate(password)) {
                        this.user = u
                        this.sendPacket(
                            p.LOGIN_ACCEPTED,
                            { username: u.username }
                        )
                        this.sendSystemMessage(`You logged in as ${u.username}`)
                        this.room.updateRoomUsersList()
                    } else {
                        this.sendPacket(p.LOGIN_DENIED_BAD_DETAILS, {
                            type:       'danger',
                            message:    'The login details you provided were invalid.  Check your username and password, and try again.'
                        })
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
