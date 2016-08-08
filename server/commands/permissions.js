export default {
    name:               'permissions',
    description:        "Displays the user's current permissions.",
    opts: {
        visibleInChat:  false
    },
    test: /^(permissions|perms|privs|privileges|permission)$/,
    checkForPermissions: (server, client) => true,
    commandHandler: (server, client, message) => {
        if(null === message || !message.length) {
            client.sendSystemMessage(
                `Your permissions: ${client.user._permissions.join(' ')}`
            )
        } else {

        }
    }
}
