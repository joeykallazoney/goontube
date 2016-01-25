import * as commands from './commands'

export default function commandParser(server, client, inputString) {
    if(!inputString || inputString[0] != '$') {
        return
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
                commands[cmd].commandHandler(
                    server,
                    client,
                    remainingArguments)
            })
        if(true === /^[0-9]+d[0-9]+$/.test(command)) {
        }
    } catch(e) {
    }
}
