import p from '../../shared/protocol'
import { youtubeBrowserApiKey } from '../../config'

const initialState = {
    query:          '',
    results:        [],
    desired:        false,
    youtubeApiKey:  youtubeBrowserApiKey
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.SEARCH_NEW_SEARCH:
            return {
                ...state,
                query:      action.data,
                desired:    true,
                results:    []
            }

        case p.SEARCH_RESET:
            return {
                ...state,
                ...initialState
            }

        case p.SEARCH_RECEIVED_YOUTUBE_RESULTS:
            return {
                ...state,
                results: [...action.data]
            }

        default:
            return state
    }
}
