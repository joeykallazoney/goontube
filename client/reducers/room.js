import p from '../../shared/protocol'

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
    },
    addMediaModal: false
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.ROOM_INFO_UPDATE:
            return {
                ...state,
                name: action.data.name
            }

        case p.ADD_MEDIA_CLICK:
            return {
                ...state,
                addMediaModal: true
            }
        case p.ADD_MEDIA_MODAL_CLOSED:
            return {
                ...state,
                addMediaModal: false
            }
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

        case p.SYSTEM_MESSAGE:
            console.log(action.data)
            return {
                ...state,
                history: [...state.history, { system: true, message: action.data }]
            }

        default:
            return state
    }
}
