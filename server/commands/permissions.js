export default {
    name:               'permissions',
    description:        "Displays the user's current permissions.",
    options: {
        visibleInChat:  true
    },
    checkForPermissions: (server, client) => true,
    commandHandler: (server, client, message) => {
        
    }
}
