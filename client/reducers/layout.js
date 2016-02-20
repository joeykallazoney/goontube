const initialState = {
    heightbase:     32,
    banner:         { width: 12,    height: 4 },
    player:         { width: 7,     height: 9 },
    chat:           { width: 5,     height: 9 },
    chatList:       { width: 8 },
    chatUsers:      { width: 4 },
    playlist:       { width: 7,     height: 9 },
    contentPane:    { width: 5,     height: 9 }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state
    }
}
