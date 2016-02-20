/**
 * @file Provides a series of handlers for messages received by the server.
 * @since 1.0.0
 */
import p from '../shared/protocol'
import uuid from 'node-uuid'
import { shuffle } from './commands/shuffle'

module.exports = {
    CLIENT_HELLO: (server, client, msg) => {
        let encoded = JSON.stringify({
            type: p.CLIENT_HELLO,
            data: `Hello there!`
        })
        return true
    },

    PLAYLIST_EXCHANGE_REQUEST: (server, client, msg) => {
        client.room.swapVideosById(msg.a, msg.b)
        return true
    },

    PLAYLIST_SKIP_REQUEST: (server, client, msg) => {
        client.room.startNextVideo()
        return true
    },

    PLAYLIST_SHUFFLE_REQUEST: (server, client, msg) => {
        shuffle(client.room.playlist)
        client.room.broadcastRoomPlaylist()
        return true
    },

    REQUEST_DELETE_PLAYLIST_ENTRY: (server, client, msg) => {
        console.log('Client requested playlist delete ' + msg)
        return true
    },

    REQUEST_ADD_MEDIA_BY_URL: (server, client, msg) => {
        console.log('Client requested add media: ' + msg)
        return true
    },

    REGISTRATION_ATTEMPT: (server, client, msg) => {
        try {
            if(null === msg) return false

            console.log('Registration request received.')
        } catch(e) {
            console.log('Bad REGISTRATION_ATTEMPT packet sent.')
        }
    },

    AUTHENTICATION_ATTEMPT: (server, client, msg) => {
        try {
            if(null === msg) return false
            console.log(msg)
            client.login(msg.username, msg.password)
        } catch(e) {
            console.log('Bad AUTHENTICATION_ATTEMPT packet sent.')
        }
    },

    LOGOUT_USER: (server, client, msg) => {
        client._auth = false
        client.user = null
        client.sendPacket(p.LOGOUT_USER)
        client.room.updateRoomUsersList()
    },

    SEND_CHAT_MESSAGE: (server, client, msg) => {
        if(null === msg) return false

        server.parser(server, client, msg)

        if(client.user) {
            server.clients
                .filter(c => (c.room === client.room))
                .map(c => {
                    c.sendPacket(
                        p.ROOM_USER_MESSAGE,
                        {
                            id: uuid.v4(),
                            from: client.user.username,
                            body: msg
                        })
                })
        } else {
            console.log(`Ignored anonymous chat message: ${msg}`)
        }
    }
}
