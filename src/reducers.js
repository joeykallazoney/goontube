/**
 * @file Provides a series of pure functions for altering the application as
 * an immutable state tree.
 * @since 1.0.0
 */
import I from 'immutable'
import p from './protocol'
import { applyMiddleware, compose } from 'redux'
import defaults from './defaults'

// signature: (state, []:reducers) -> (state, action)
//let transducer = (state = defaultApplicationState, [reducers]) =>
//    (reducers.map(r => (...r)(state)()))

function rootReducer(state = I.Map(defaults), action) {
    switch(action.type) {
        case p.ROOM_CLEAR_MESSAGES:
            state = state.setIn(['room', 'history'], [])
            return state

        case p.ROOM_USER_MESSAGE:
            state = state.updateIn(['room', 'history'],
                log => log.push(action.data)
            )
            return state

        case p.SET_PLAYBACK_POSITION:
            state = state.set('media',
                    ...state.get('media'),
                    { position: action.data })
            return state

        case p.BANNER_LIST_UPDATE:
            state = state.set('banner',
                    ...state.get('banner'),
                    { possibilities: action.data })
            return state

        case p.BANNER_NEW_BANNER:
            const possibilities = state.get('banner').possibilities
            const currentBannerIndex = parseInt(action.data)

            return state
                .set('banner', {
                    possibilities:      possibilities,
                    currentBannerIndex: currentBannerIndex
                })

        default:
            return state
    }
}

export default rootReducer
