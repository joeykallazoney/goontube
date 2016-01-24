/**
 * @file Provides a series of handlers for messages received by the server.
 * @since 1.0.0
 */
import p from './protocol'

module.exports = {
    CLIENT_HELLO: (server, client, msg) => {
        client.send({
            type: p.CLIENT_HELLO,
            data: `Hello, ${msg}!`
        })
    },

    SEND_CHAT_MESSAGE: (server, client, msg) => {

    }
}
