/**
 * @file Describes the interface for a dummy command module.
 * @since 1.0.0
 */
import { makePacket } from '../util'
import uuid from 'node-uuid'
import p from '../protocol'

export default {
    /* The command name which will be typed in chat to trigger it. $command */
    name:               'dummy',

    /* A description to feed into some sort of $help command */
    description:        'Dummy command which does nothing.',

    /* Options to specify this command's general behaviour. */
    opts: {
        visibleInChat:  true /* Can other users see $command being entered? */
    },

    /* Prior to calling the command handler, this optional callback can
     * return false to prevent executing the command.
     *
     * In this case we specify an anonymous function which calls and returns
     * the value of User's utility function userHasPermission(perm).
     */
    checkForPermissions: (server, client) => true,

    /*
     * Command handler which receives handles to the server, client, and the
     * message which is considered to have passed and is being parsed.
     */
    commandHandler: (server, client, message) => {
    }
}
