export function makePacket(type, data = {}) {
    return JSON.stringify({
        type: type,
        data: data
    })
}
