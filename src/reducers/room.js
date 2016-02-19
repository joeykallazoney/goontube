import p from '../protocol'

const initialState = {
    name:           null,
    motd:           null,
    playlist:       [],
    users:          [],
    history:        [],
    media: {
        active:     false,
        streams:    [],
        id:         'FTaWrcmhAgw',
        provider:   'youtube',
        position:   0,
        startTime:  Date.now()
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.ROOM_CLEAR_MESSAGES:
            return {
                ...state,
                history: []
            }

        case p.ROOM_MEDIA_UPDATE:
            return {
                ...state,
                media: action.data
            }

        case p.ROOM_PLAYLIST_UPDATE:
            return {
                ...state,
                playlist: action.data.items
            }

        case p.ROOM_LIST_UPDATE:
            return {
                ...state,
                users: action.data
            }

        case p.ROOM_USER_MESSAGE:
            return {
                ...state,
                history: [...state.history, action.data]
            }

        default:
            return state
    }
}