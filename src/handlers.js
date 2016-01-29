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
        return true
    },

    AUTHENTICATION_ATTEMPT: (server, client, msg) => {
        try {
            if(null === msg) return false

            client.login(msg.username, msg.password)
        } catch(e) {
            console.log('Bad AUTHENTICATION_ATTEMPT packet sent.')
        }
    },

    SEND_CHAT_MESSAGE: (server, client, msg) => {
        if(null === msg) return false

        server.parser(server, client, msg)
    }
    
    // Search

    // End Search
}
