/**
 * @file Skip current video.
 * @since 1.0.0
 */
import { makePacket } from '../../shared/util'
import uuid from 'node-uuid'
import p from '../../shared/protocol'

// props: http://stackoverflow.com/a/6274381
export function shuffle(o) {
    var j, x, i

    for (i = o.length; i; i -= 1) {
        j = Math.floor(Math.random() * i)
        x = o[i - 1]
        o[i - 1] = o[j]
        o[j] = x
    }

    return o
}

export default {
    name:               'shuffle',
    description:        'Shuffles the current room playlist.',
    opts: {
        visibleInChat:  true,
    },
    test: /^shuffle$/,
    checkForPermissions: (server, client) => true,
    commandHandler: (server, client, message) => {
        shuffle(client.room.playlist)
        client.room.broadcastRoomPlaylist()
    }
}
