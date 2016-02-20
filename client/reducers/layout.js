const initialState = {
    heightbase:     40,
    banner:         { width: 12,    height: 2 },
    player:         { width: 7,     height: 4 },
    chat:           { width: 5,     height: 4 },
    playlist:       { width: 7,     height: 4 },
    contentPane:    { width: 7,     height: 4 }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state
    }
}
