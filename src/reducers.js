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
            '//localhost:7070/img/banners/5MeXvVv.jpg',
            '//localhost:7070/img/banners/9Nj8uNd.png',
            '//localhost:7070/img/banners/EhtdkPS.jpg',
            '//localhost:7070/img/banners/iwg4m.png',
            '//localhost:7070/img/banners/jeNmV9k.jpg',
            '//localhost:7070/img/banners/QShC1ri.png',
            '//localhost:7070/img/banners/xBYdAMC.png',
            '//localhost:7070/img/banners/z1wLRl1.png'
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

function rootReducer(state = defaultApplicationState, action) {
    switch(action.type) {
        case p.BANNER_LIST_UPDATE:
            state = state.deleteIn(['banner', 'possibilities'])

            return state
                .mergeIn(['banner', 'possibilities'], action.data)

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
