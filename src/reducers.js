/**
 * @file Provides a series of pure functions for altering the application as
 * an immutable state tree.
 * @since 1.0.0
 */
import I, { fromJS } from 'immutable'
import p from './protocol'
import { applyMiddleware, compose } from 'redux'
import defaults from './defaults'

// signature: (state, []:reducers) -> (state, action)
//let transducer = (state = defaultApplicationState, [reducers]) =>
//
//    (reducers.map(r => (...r)(state)()))

function rootReducer(state = fromJS(defaults), action) {
    switch(action.type) {
        case p.ROOM_CLEAR_MESSAGES:
            state = state.set('room',
                {
                    ...state.get('room'),
                    history: []
                })
            return state

        case p.ROOM_USER_MESSAGE:
            state = state.updateIn(['room', 'history'],
                history => history.push(action.data))
            return state

        case p.SET_PLAYBACK_POSITION:
            return state

        case p.BANNER_LIST_UPDATE:
            state = state.setIn(['banner', 'possibilities'], action.data)
            return state

        case p.BANNER_NEW_RANDOM_BANNER:
            state = state.setIn(['banner', 'currentBannerIndex'],
                    parseInt(Math.random() * state.getIn(['banner', 'possibilities']).size))
            return state

        case p.BANNER_NEW_BANNER:
            const currentBannerIndex = parseInt(action.data)

            return state
                .setIn(['banner', 'currentBannerIndex'], currentBannerIndex)
        // Begin Search
        case p.SEARCH_NEW_SEARCH:
            state = state.set('search', {
                ...state.get('search'),
                query: action.value
            })
            return state
        // End Search

        default:
            return state
    }
}

export default rootReducer
