import p from '../protocol'

/**
 * @class Models instances of individual client sessions.
 * @since 1.0.0
 */
class Client {
    teardown() {

    }

    constructor(socket, serverStore) {
        this.socket      = socket
        this.address     = socket._socket.address()
        this.user        = null
    }
}

export default Client
