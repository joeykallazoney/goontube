import p from '../../shared/protocol'

const initialState = {
    desiredRoom:    'lobby',
    settingsModal:  false,
    rooms: {
        ready:      false,
        index:      0,
        list:       []
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.SETTINGS_MODAL_CLOSED:
            return {
                ...state,
                settingsModal: false
            }

        case p.ACCOUNT_BUTTON_CLICKED:
            return {
                ...state,
                settingsModal: true
            }
        case p.SET_ROOM_LIST:
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
