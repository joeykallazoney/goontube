export default {
    name:               'me',
    description:        'Emotes a message to the room.',
    opts: {
        visibleInChat:  false
    },
    test: /^me$/,
    checkForPermissions: (server, client) => true,
    commandHandler: (server, client, message) => {
        if(null !== message) {
            client.room.members.forEach(user => {
                user.sendResultMessage(
                    `${client.user.username} ${message}`
                )
            })
        }
    }
}
