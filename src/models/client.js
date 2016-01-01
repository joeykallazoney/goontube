import p from '../protocol'

class Client {
    constructor(socket, serverStore) {
        this.socket  = socket
        this.store   = serverStore
    }
}

export default Client
