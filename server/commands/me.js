export default {
    name:               'kick',
    description:        'Kicks a user from the current room.',
    opts: {
        visibleInChat:  true
    },
    test: /me$/,
    checkForPermissions: (server, client) =>
        (false === client.user.userHasPermission('kick')),

    commandHandler: (server, client, message) => {

    }
}
