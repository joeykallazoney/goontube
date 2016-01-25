import * as commands from './commands'

/**
 * @function Parses client chat strings and passes to a command handler if appropriate.
 * @param {Object} server - The server application context object.
 * @param {Client} client - The session/client for whom input is being parsed.
 * @param {string} inputString - The full input string sent as a chat message.
 * @returns Whether or not the command was parsed by any handler.
 */
export default function commandParser(server, client, inputString) {
    if(!inputString || (('$' !== inputString[0]) && ('/' !== inputString[0]))) {
        return false
    }

    try {
        let nextSpace = inputString.indexOf(' ')
        let remainingArguments = -1 === nextSpace ? null : inputString.slice(nextSpace + 1)
        let command

        if(-1 === nextSpace) {
            command = inputString.slice(1).toLowerCase()
        } else {
            command = inputString.slice(1, nextSpace).toLowerCase()
        }

        Object.keys(commands)
            .filter((cmd) => commands[cmd].name === command)
            .map((cmd) => {
                try {
                    commands[cmd].commandHandler(
                        server,
                        client,
                        remainingArguments)
                    return true
                } catch(e) {

                }
            })
        if(true === /^[0-9]+d[0-9]+$/.test(command)) {
        }
    } catch(e) {
    }

    return false
}
