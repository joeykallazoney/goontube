import p from '../../shared/protocol'

const initialState = {
    heightbase:     32,
    fluid:          false,
    banner:         { width: 12,    height: 4 },
    player:         { width: 7,     height: 9 },
    chat:           { width: 5,     height: 9 },
    chatList:       { width: 8 },
    chatUsers:      { width: 4 },
    playlist:       { width: 7,     height: 9 },
    contentPane:    { width: 5,     height: 9 },
    footer:         { width: 12 }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.TOGGLE_FLUID:
            return {
                ...state,
                fluid: !state.fluid
            }

        case p.SET_PLAYER_WIDTH:
            return {
                ...state,
                player: {
                    ...state.player,
                    width: action.data
                }
            }
        default:
            return state
    }
}
