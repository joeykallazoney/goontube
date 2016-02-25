export default {
    name:               'me',
    description:        'Emotes a message to the room.',
    opts: {
        visibleInChat:  false
    },
    test: /^me$/,
    checkForPermissions: (server, client) => true,
    commandHandler: (server, client, message) => {
        client.room.members.forEach(user => {
            user.sendSystemMessage(
                `${client.user.username} ${message}`
            )
        })
    }
}
