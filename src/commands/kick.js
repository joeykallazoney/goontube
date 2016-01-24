export default {
    name:               'kick',
    description:        'Kicks a user from the current room.',
    options: {
        visibleInChat:  true
    },
    events: {
        checkForPermissions: (server, client) =>
            (false === client.user.userHasPermission('kick')),

        commandHandler: (server, client, message) {
        },
    }
}
