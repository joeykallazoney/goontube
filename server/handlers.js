/**
 * @file Provides a series of handlers for messages received by the server.
 * @since 1.0.0
 */
import p from '../shared/protocol'
import uuid from 'node-uuid'
import { shuffle } from './commands/shuffle'
import { providerForUrl } from './providers'

module.exports = {
    CLIENT_HELLO: (server, client, msg) => {
        let encoded = JSON.stringify({
            type: p.CLIENT_HELLO,
            data: `Hello there!`
        })

        return true
    },

    REQUEST_VALIDATION_FOR_URL: (server, client, msg) => {
        const result = providerForUrl(msg)

        if(null === client.user) {
            return
        }

        if(null === msg || !msg.length) {
            client.sendPacket(p.VALIDATION_RESPONSE, {
                validated: false,
                info: {
                    message: 'Not a valid URL.'
                }
            })
            return true
        }

        if(null === result) {
            let feedback = {
                message: `Not a recognized provider!`
            }

            client.sendPacket(p.VALIDATION_RESPONSE, { validated: false, info: feedback })
        } else {
            /* do a query cache of some sort here */

            /* else fetch fresh data async ... */
            result.provider.fetchMetaById(result.videoId).then(
                meta => {
                    let token = uuid.v4()
                    let feedback = {
                        inputURL:       msg,
                        providerName:   result.provider.getName(),
                        title:          meta.title,
                        duration:       meta.duration,
                        message:        `Looks like a ${result.provider.getName()} video with title [${meta.title}] and duration [${meta.duration}] milliseconds.`,
                        token:          token
                    }

                    server.tokens.add[token] = {
                        provider:       result.provider.getName(),
                        id:             result.videoId,
                        duration:       meta.duration,
                        title:          meta.title
                    }

                    client.sendPacket(p.VALIDATION_RESPONSE, {
                        validated:      true,
                        info:           feedback
                    })
                }
            )
        }
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
        if(null !== client.user && client.user.userHasPermission('lead')) {
            client.room.swapVideosById(msg.a, msg.b)
        }

        return true
    },

    PLAYLIST_SKIP_REQUEST: (server, client, msg) => {
        if(null !== client.user && client.user.userHasPermission('skip'))
            client.room.startNextVideo()
        return true
    },

    PLAYLIST_SHUFFLE_REQUEST: (server, client, msg) => {
        if(null !== client.user && client.user.userHasPermission('lead')) {
            shuffle(client.room.playlist)
            client.room.broadcastRoomPlaylist()
        }
        return true
    },

    REQUEST_DELETE_PLAYLIST_ENTRY: (server, client, msg) => {
        if(null !== client.user && client.user.userHasPermission('delete')) {
            client.room.playlist = client.room.playlist.filter(v => v.id !== msg)
            client.room.broadcastRoomPlaylist()
        }
        return true
    },

    REQUEST_ADD_MEDIA_BY_KEY: (server, client, msg) => {
        try {
            if(null === client.user) {
                return
            }

            let video = server.tokens.add[msg.key]

            console.log(msg)

            client.room.addYouTubeVideoToPlaylist(
                video.id,
                video.title,
                video.duration)
            console.log('Added video!')
        } catch(e) {
            console.error('Erroneous media add...')
        }

        return true
    },

    REQUEST_ADD_MEDIA_BY_URL: (server, client, msg) => {
        if(null === client.user) {
            return
        }

        return true
    },

    REGISTRATION_ATTEMPT: (server, client, msg) => {
        try {
            if(client.user !== null) {
                console.log('Fishy: already active user trying to register')
                return false
            }

            if(null === msg) return false
            console.log('Processing registration attempt...')

            server.data
                .User
                .create({
                    username:       msg.username,
                    password:       msg.password,
                    email:          '',
                    permissions:    0,
                    ignoring:       '',
                    last_ip:        '',
                    karma:          0,
                    bio:            '',
                    start_ban_at:   0,
                    ban_duration:   0,
                    last_seen_at:   Date.now(),
                    time_spent:     0,
                    json_data:      ''
                })
                .then(() => {
                    console.log('New user registered!')
                })
                .catch((err) => {
                    console.log('New user registration failed...')
                    console.log(err)
                })
            return true
        } catch(e) {
            console.log(e)
            console.log('Bad REGISTRATION_ATTEMPT packet sent.')
        }

        return false
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

        if(null !== client.user) {
            let parseResult = server.parser(server, client, msg)

            if(false === parseResult.commandParsed || parseResult.visibleInChat === true) {
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
            }
        } else {
        }
    }
}
