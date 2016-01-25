import p from '../protocol'

/**
 * @class Models instances of individual client sessions.
 * @since 1.0.0
 */
class Client {
    teardown() {

    }

    closeWithReason(message) {
        this.socket.send(JSON.stringify({
            type: p.DISCONNECTED_WITH_REASON,
            data: message
        }))

        this.close()
    }

    close() {
        if(null !== this.socket)
            this.socket.close()
    }

    constructor(socket, serverStore) {
        this.socket      = socket
        this.address     = socket._socket.address()
        this.user        = null
    }
}

export default Client
