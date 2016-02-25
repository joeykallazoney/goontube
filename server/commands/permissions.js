export default {
    name:               'permissions',
    description:        "Displays the user's current permissions.",
    opts: {
        visibleInChat:  false
    },
    test: /(permissions|privileges|permission)/,
    checkForPermissions: (server, client) => true,
    commandHandler: (server, client, message) => {
        if(null === message || !message.length) {
            client.sendSystemMessage(
                `Permissions: ${client.user._legacyPermission.join(' ')}`
            )
        } else {

        }
    }
}
