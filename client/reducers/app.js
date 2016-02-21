import p from '../../shared/protocol'

const initialState = {
    desiredRoom:    'lobby',
    rooms: {
        ready:      false,
        index:      0,
        list:       []
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.SET_ROOM_LIST:
            console.dir(action.data[0])
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    list: action.data
                }
            }

        default:
            return state
    }
}
