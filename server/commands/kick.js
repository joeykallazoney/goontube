export default {
    name:               'kick',
    description:        'Kicks a user from the current room.',
    opts: {
        visibleInChat:  true
    },
    test: /kick/,
    checkForPermissions: (server, client) =>
        (false === client.user.userHasPermission('kick')),

    commandHandler: (server, client, message) => {

    }
}
