import p from '../../shared/protocol'

const initialState = {
    query: '',
    results: [],
    desired: false,
    youtubeApiKey: 'AIzaSyBQW8bHDt7RHZa5uVVRP4r0jNIUZD_39o4'
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.SEARCH_NEW_SEARCH:
            return {
                ...state,
                query: action.data,
                desired: true,
                results: []
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
