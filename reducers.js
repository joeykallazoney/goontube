/**
 * @file Provides a series of pure functions for altering the application as
 * an immutable state tree.
 * @since 1.0.0
 */
import I from 'immutable'
import p from './protocol'
import { applyMiddleware, compose } from 'redux'

const defaultApplicationState = I.Map({
    media: {
        id:         null,
        provider:   null,
        position:   0
    },
    banner: {
        currentBannerIndex:  0,
        possibilities:       []
    },
    room: {
        name:       null,
        motd:       null,
        playlist:   [],
        users:      [],
        history:    []
    }
})

function rootReducer(state = defaultApplicationState(), action) {
    switch(action.type) {
        case BANNER_LIST_UPDATE:
            state = state.deleteIn(['banner', 'possibilities'])

            return state
                .mergeIn(['banner', 'possibilities'], action.data)

        case BANNER_NEW_BANNER:
            return state
                .setIn(['banner', 'currentBannerIndex'], action.data)

        default:
            return state
    }
}

export default rootReducer
