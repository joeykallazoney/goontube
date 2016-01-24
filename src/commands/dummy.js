/**
 * @file Describes the interface for a dummy command module.
 * @since 1.0.0
 */
export default {
    /* The command name which will be typed in chat to trigger it. $command */
    name:               'commandname',

    /* A description to feed into some sort of $help command */
    description:        'Kicks a user from the current room.',

    /* Options to specify this command's general behaviour. */
    opts: {
        visibleInChat:  true /* Can other users see $command being entered? */
    },
    events: {
        /* Prior to calling the command handler, this optional callback can
         * return false to prevent executing the command.
         *
         * In this case we specify an anonymous function which calls and returns
         * the value of User's utility function userHasPermission(perm).
         */
        checkForPermissions: (server, client) =>
            (false === client.user.userHasPermission('commandname')),

        /*
         * Command handler which receives handles to the server, client, and the
         * message being parsed.
         */
        commandHandler: (server, client, message) {

        },
    }
}
