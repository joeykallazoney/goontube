import p from '../protocol'

const initialState = {
    user:       null,
    token:      null
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.LOGIN_ACCEPTED:
            return {
                ...state,
                user: action.data.username
            }

        case p.LOGOUT_USER:
            return {
                ...state,
                user: null
            }

        default:
            return state
    }
}
