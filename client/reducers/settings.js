import p from '../../shared/protocol'

const initialState = {
    bodyStyles: {
        backgroundColor:    '#222222'
    },
    showBanner:             false,
    showBackgroundPicker:   false,
    showPlayer:             true,
    showSiteBarBgPicker:    false,
    showWebcams:            false,
    siteBarStyles: {
        backgroundColor:    '#ffa800'
    },
    webcamBandwidth:        45
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.TOGGLE_WEBCAMS:
            return {
                ...state,
                showWebcams: !state.showWebcams
            }

        case p.TOGGLE_PLAYER:
            return {
                ...state,
                showPlayer: !state.showPlayer
            }

        case p.TOGGLE_BANNER:
            return {
                ...state,
                showBanner: !state.showBanner
            }

        case p.SHOW_BANNER:
            return {
                ...state,
                showBanner: true
            }

        case p.HIDE_BANNER:
            return {
                ...state,
                showBanner: false
            }

        case p.SET_WEBCAM_BANDWIDTH:
            return {
                ...state,
                webcamBandwidth: action.data
            }

        case p.HIDE_SITEBAR_BG_PICKER:
            return {
                ...state,
                showSiteBarBgPicker: false
            }
        case p.SHOW_SITEBAR_BG_PICKER:
            return {
                ...state,
                showSiteBarBgPicker: true
            }
        case p.HIDE_BODY_BG_PICKER:
            return {
                ...state,
                showBackgroundPicker: false
            }
        case p.SHOW_BODY_BG_PICKER:
            return {
                ...state,
                showBackgroundPicker: true
            }

        case p.SET_BODY_BG_COLOR:
            return {
                ...state,
                bodyStyles: {
                    ...state.bodyStyles,
                    backgroundColor: action.data
                }
            }

        case p.SET_SITEBAR_BG_COLOR:
            return {
                ...state,
                siteBarStyles: {
                    ...state.siteBarStyles,
                    backgroundColor: action.data
                }
            }

        default:
            return state
    }
}
