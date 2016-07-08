var wisdom = require('./answers')

export default {
    name:               '8ball',
    description:        'Consults the Magic 8-Ball',
    opts: {
        visibleInChat: false 
    },
    test: /^8ball$/,
    checkForPermissions: (server, client) => true,
    commandHandler: (server, client, message) => {
        if(null == message) {
            client.room.members.forEach(user => {
                user.sendResultMessage(
                    `The Magic 8-Ball says: ${message} ${wisdom()}`
                )
            })
        }
    }
}
