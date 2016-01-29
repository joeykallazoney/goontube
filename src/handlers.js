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

    LOGOUT_USER: (server, client, msg) => {
        client._auth = false
        client.user = null
        client.sendPacket(p.LOGOUT_USER)
    },

    SEND_CHAT_MESSAGE: (server, client, msg) => {
        if(null === msg) return false

        server.parser(server, client, msg)

        if(client.user) {
            server.clients.map((c) => {
                c.sendPacket(
                    p.ROOM_USER_MESSAGE,
                    {
                        from: client.user.user.dataValues.username,
                        body: msg
                    })
            })
        } else {
            console.log(`Ignored anonymous chat message: ${msg}`)
        }
    }

    // Search

    // End Search
}
