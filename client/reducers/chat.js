import p from '../../shared/protocol'

const initialState = {
    input: ''
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.SET_CHAT_INPUT:
            return {
                ...state,
                input: action.data
            }
    }

    return state
}
