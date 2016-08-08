import p from '../../shared/protocol'

const initialState = {
    input:              '',
    startAt:            0,
    validating:         false,
    validated:          false,
    feedback:           '',
    lastEventKey:       null
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.SET_START_AT:
            return {
                ...state,
                startAt: action.data
            }

        case p.REQUEST_VALIDATION_FOR_URL:
            return {
                ...state,
                validating: true
            }

        case p.VALIDATION_RESPONSE:
            return {
                ...state,
                feedback:   action.data.info,
                validating: false,
                validated:  action.data.validated
            }


        case p.ADD_MEDIA_INPUT:
            return {
                ...state,
                feedback:   '',
                validated:  false,
                validating: false,
                input:      action.data
            }

        case p.ADD_MEDIA_MODAL_CLOSED:
            return {
                ...state,
                validated:  false,
                validating: false,
                startAt:    0,
                input:      ''
            }
    }

    return state
}
