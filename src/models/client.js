import p from '../protocol'

class Client {
    constructor(socket, serverStore) {
        this.socket      = socket
        this.address     = socket._socket.address()
        this.serverStore = serverStore
    }
}

export default Client
