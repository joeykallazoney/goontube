import p from '../../shared/protocol'

const initialState = {
    usernameInput:      '',
    passwordInput:      '',
    user:               null,
    token:              null,
    loginModal:         false
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.LOGIN_FORM_UPDATE_USERNAME:
            return {
                ...state,
                usernameInput: action.data
            }

        case p.LOGIN_FORM_UPDATE_PASSWORD:
            return {
                ...state,
                passwordInput: action.data
            }

        case p.LOGIN_CLICKED:
            return {
                ...state,
                loginModal: true
            }

        case p.LOGIN_MODAL_CLOSED:
            return {
                ...state,
                loginModal: false,
                usernameInput: '',
                passwordInput: ''
            }

        case p.LOGIN_ACCEPTED:
            return {
                ...state,
                user:       action.data.username,
                loginModal: false
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
