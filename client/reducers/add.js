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
                validating: false
            }

        case p.ADD_MEDIA_INPUT:
            return {
                ...state,
                input: action.data
            }
    }

    return state
}
