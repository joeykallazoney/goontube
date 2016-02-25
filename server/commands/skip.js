/**
 * @file Skip current video.
 * @since 1.0.0
 */
import { makePacket } from '../../shared/util'
import uuid from 'node-uuid'
import p from '../../shared/protocol'

export default {
    /* The command name which will be typed in chat to trigger it. $command */
    name:               'skip',

    /* A description to feed into some sort of $help command */
    description:        'Skips the currently playing video.',

    /* Options to specify this command's general behaviour. */
    opts: {
        visibleInChat:  true /* Can other users see $command being entered? */
    },

    test: /^skip$/,

    /* Prior to calling the command handler, this optional callback can
     * return false to prevent executing the command.
     *
     * In this case we specify an anonymous function which calls and returns
     * the value of User's utility function userHasPermission(perm).
     */
    checkForPermissions: (server, client) => {
         return client.user.userHasPermission('skip')
    },

    /*
     * Command handler which receives handles to the server, client, and the
     * message which is considered to have passed and is being parsed.
     */
    commandHandler: (server, client, message) => {
        client.room.startNextVideo()
    }
}
