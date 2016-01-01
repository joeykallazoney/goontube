import p from '../protocol'

class Client {
    teardown() {
    }

    constructor(socket, serverStore) {
        this.socket      = socket
        this.address     = socket._socket.address()
        this.serverStore = serverStore
    }
}

export default Client
