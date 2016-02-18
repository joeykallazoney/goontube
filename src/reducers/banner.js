import p from '../protocol'

const initialState = {
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
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.BANNER_NEW_RANDOM_BANNER:
            return {
                ...state,
                currentBannerIndex: parseInt(Math.random() * state.possibilities.length)
            }

        case p.BANNER_NEW_BANNER:
            return {
                ...state,
                currentBannerIndex: parseInt(action.data)
            }

            return state

        default:
            return state
    }
}
