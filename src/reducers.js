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
        id:         'FTaWrcmhAgw',
        provider:   'youtube',
        position:   0
    },
    layout: {
    // this will be relevant when react-grid-layout is up to date with react+usable again
        banner:   { x: 0,   y: 0,   w: 12,  h: 2 },
        player:   { x: 0,   y: 2,   w: 5,   h: 4 },
        chat:     { x: 6,   y: 2,   w: 6,   h: 4 },
        playlist: { x: 0,   y: 6,   w: 5,   h: 4 },
        content:  { x: 6,   y: 6,   w: 5,   h: 4 }
    },
    banner: {
        currentBannerIndex:  0,
        possibilities:       [
            '/img/banners/5MeXvVv.jpg',
            '/img/banners/9Nj8uNd.png',
            '/img/banners/EhtdkPS.jpg',
            '/img/banners/iwg4m.png',
            '/img/banners/jeNmV9k.jpg',
            '/img/banners/QShC1ri.png',
            '/img/banners/xBYdAMC.png',
            '/img/banners/z1wLRl1.png'
        ]
    },
    room: {
        name:       null,
        motd:       null,
        playlist:   [],
        users:      [],
        history:    []
    }
})

// signature: (state, []:reducers) -> (state, action)
//let transducer = (state = defaultApplicationState, [reducers]) =>
//    (reducers.map(r => (...r)(state)()))

function rootReducer(state = defaultApplicationState, action) {
    switch(action.type) {
        case p.SET_PLAYBACK_POSITION:
            state = state.set('media',
                Object.assign({},
                    ...state.get('media'),
                    { position: action.data }))
            return state

        case p.BANNER_LIST_UPDATE:
            state = state.set('banner',
                Object.assign({},
                    ...state.get('banner'),
                    { possibilities: action.data }))
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
