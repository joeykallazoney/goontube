export default {
    name:               'me',
    description:        'Emotes a message to the room.',
    opts: {
        visibleInChat:  false
    },
    test: /^me$/,
    checkForPermissions: (server, client) => true,
    commandHandler: (server, client, message) => {

    }
}
