/**
 * @file Provides a series of handlers for messages received by the server.
 * @since 1.0.0
 */
import p from './protocol'

module.exports = {
    CLIENT_HELLO: (server, client, msg) => {
        let encoded = JSON.stringify({
            type: p.CLIENT_HELLO,
            data: `Hello there!`
        })

        client.send(encoded)
        return true
    },

    SEND_CHAT_MESSAGE: (server, client, msg) => {
        if(null === msg) return false
    }
}
