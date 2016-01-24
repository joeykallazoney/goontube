export default {
    name:               'kick',
    description:        'Kicks a user from the current room.',
    opts: {
        visibleInChat:  true
    },
    events: {
        checkForPermissions: (server, client) {
            
        },

        commandHandler: (server, client, message) {
        },
    }
}
