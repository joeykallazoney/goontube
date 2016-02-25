/**
 * @module Exports a command parser for goontube commands.
 * @since 1.0.0
 */
import commands from './commands'

/**
 * @function Parses client chat strings and passes to a command handler if appropriate.
 * @param {Object} server - The server application context object.
 * @param {Client} client - The session/client for whom input is being parsed.
 * @param {string} inputString - The full input string sent as a chat message.
 * @returns Whether or not the command was parsed by any handler.
 */
export default function commandParser(server, client, inputString) {
    if(!inputString || (('$' !== inputString[0]) && ('/' !== inputString[0]))) {
        return {
            commandParsed: false
        }
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

        /*
         * Iterate over all keys in the 'commands' object, which contains only valid
         * commands as per the common interface defined in 'commands/dummy.js',
         * and applies a filter returning only those matching commands and executing
         * the first match before returning true - we have parsed the command!
         *
         * This current parser is a straight port of the old Python 2.7 tubes parser,
         * I will probably rewrite it before all is said and done, I have some cool
         * ideas to cleanly allow multiple handlers for a single command, etc.
         */
        const handler = Object.keys(commands).find(cmd => command.match(commands[cmd].test))

        if(null !== handler) {
            commands[handler].commandHandler(
                server,
                client,
                remainingArguments)
            return {
                commandParsed: true,
                visibleInChat: commands[handler].opts.visibleInChat
            }
        }
    } catch(e) {
        console.log(e)
    }

    return {
        commandParsed: false
    }
}
