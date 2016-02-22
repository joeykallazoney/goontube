import p from '../../shared/protocol'

const initialState = {
    input:              '',
    validating:         false,
    validated:          false,
    lastEventKey:       null
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.REQUEST_VALIDATION_FOR_URL:
            return {
                ...state,
                validating: true
            }

        case p.VALIDATION_RESPONSE:
            return {
                ...state,
                validating: false,
                validated:  action.data.validated
            }


        case p.ADD_MEDIA_INPUT:
            return {
                ...state,
                validated:  false,
                validating: false,
                input:      action.data
            }

        case p.ADD_MEDIA_MODAL_CLOSED:
            return initialState
    }

    return state
}
