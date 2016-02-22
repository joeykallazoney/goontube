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

    REQUEST_VALIDATION_FOR_URL: (server, client, msg) => {
        console.log('Starting validation for ' + msg)
        client.sendPacket(p.VALIDATION_RESPONSE, { validated: true })
        return true
    },

    REQUEST_CHANGE_ROOM: (server, client, msg) => {
        let toRoom = null, fromRoom = client.room

        for(let i = 0; i < server.rooms.length; i++) {
            if(msg === server.rooms[i].name) {
                toRoom = server.rooms[i]
            }
        }

        if(toRoom !== null && (toRoom !== fromRoom)) {
            console.log(`Moving [${client.user.username}] from [${fromRoom.name}] to [${toRoom.name}]`)

            toRoom.addUser(client)
            fromRoom.removeUser(client)
            client.room = toRoom

            client.room.broadcastState()
        }

        return true
    },

    REQUEST_ROOM_LIST: (server, client, msg) => {
        client.room.broadcastRoomList()
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
        client.room.playlist = client.room.playlist.filter(v => v.id !== msg)
        client.room.broadcastRoomPlaylist()
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
            client.sendSystemMessage(`You logged in as ${msg.username}`)
        } catch(e) {
            console.log('Bad AUTHENTICATION_ATTEMPT packet sent.')
        }
    },

    REQUEST_LOGOUT: (server, client, msg) => {
        client._auth = false
        client.user = null
        client.sendPacket(p.LOGOUT_USER)
        client.room.updateRoomUsersList()
        client.sendSystemMessage(`You logged out`)
    },

    SEND_CHAT_MESSAGE: (server, client, msg) => {
        if(null === msg) return false

        if(client.user) {
            server.parser(server, client, msg)
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
