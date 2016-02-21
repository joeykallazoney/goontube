import p from '../../shared/protocol'

const initialState = {
    showBanner:             true,
    showBackgroundPicker:   false,
    showSiteBarBgPicker:    false,
    bodyStyles: {
        backgroundColor:    '#222222'
    },
    siteBarStyles: {
        backgroundColor:    '#ffa800'
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
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
            console.log(action.data)
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
