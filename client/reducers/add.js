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
            console.log(action)
            return {
                ...state,
                validating: false,
                validated: action.data.validated
            }

        case p.ADD_MEDIA_INPUT:
            return {
                ...state,
                validated: false,
                input: action.data
            }
    }

    return state
}
