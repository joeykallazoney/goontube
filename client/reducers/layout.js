const initialState = {
    stage:          { xs: 7 },
    chat:           { xs: 5 },
    playlist:       { xs: 7 },
    contentPane:    { xs: 5 }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state
    }
}
