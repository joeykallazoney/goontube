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
        id:         'wP4aCZQic4s',
        provider:   'youtube',
        position:   0
    },
    layout: {
        banner:   {x: 0, y: 0, w: 12, h: 2},
        player:   {x: 0, y: 2, w: 5, h: 4},
        chat:     {x: 6, y: 2, w: 6, h: 4},
        playlist: {x: 0, y: 6, w: 5, h: 4},
        content:  {x: 6, y: 6, w: 5, h: 4}
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

function rootReducer(state = defaultApplicationState, action) {
    switch(action.type) {
        case p.BANNER_LIST_UPDATE:
            state = state.deleteIn(['banner', 'possibilities'])

            return state
                .mergeIn(['banner', 'possibilities'], action.data)

        case p.BANNER_NEW_BANNER:
            return state
                .setIn(['banner', 'currentBannerIndex'], action.data)

        default:
            return state
    }
}

export default rootReducer
