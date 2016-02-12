/**
 * @file Provides a series of pure functions for altering the application as
 * an immutable state tree.
 * @since 1.0.0
 */
import I, { fromJS } from 'immutable'
import p from './protocol'
import { applyMiddleware, compose } from 'redux'
import defaults from './defaults'

/**
 * @function Applies a single action to the application state.
 * @returns A new application state.
 */
function rootReducer(state = defaults, action) {
    switch(action.type) {
        case p.ROOM_CLEAR_MESSAGES:
            state = {
                ...state,
                room: {
                    ...state.room,
                    history: []
                }
            }
            return state

        case p.CURRENT_MEDIA_ITEM_INFO:
            state = state
            return state

        case p.LOGIN_ACCEPTED:
            state = {
                ...state,
                auth: {
                    ...state.auth,
                    user: action.data.username
                }
            }

            return state

        case p.LOGOUT_USER:
            state = {
                ...state,
                auth: {
                    ...state.auth,
                    user: null
                }
            }
            return state

        case p.ROOM_MEDIA_UPDATE:
            state = {
                ...state,
                room: {
                    ...state.room,
                    media: action.data
                }
            }
            return state

        case p.ROOM_PLAYLIST_UPDATE:
            state = {
                ...state,
                room: {
                    ...state.room,
                    playlist: action.data.items
                }
            }
            return state

        case p.ROOM_LIST_UPDATE:
            state = {
                ...state,
                room: {
                    ...state.room,
                    users: action.data
                }
            }
            return state

        case p.ROOM_USER_MESSAGE:
            state = {
                ...state,
                room: {
                    ...state.room,
                    history: [...state.room.history, action.data]
                }
            }
            return state

        case p.SET_PLAYBACK_POSITION:
            return state

        case p.BANNER_LIST_UPDATE:
            state = {
                ...state,
                room: {
                    ...state.room,
                    users: action.data
                }
            }
            return state

        case p.BANNER_NEW_RANDOM_BANNER:
            console.log(state)
            state = {
                ...state,
                banner: {
                    ...state.banner,
                    currentBannerIndex: parseInt(Math.random() * state.banner.possibilities.length)
                }
            }
            return state

        case p.BANNER_NEW_BANNER:
            state = {
                ...state,
                banner: {
                    ...state.banner,
                    currentBannerIndex: parseInt(action.data)
                }
            }

            return state

        case p.SEARCH_NEW_SEARCH:
            state = {
                ...state.search,
                query: action.value
            }

            return state

        default:
            return state
    }
}

export default rootReducer
