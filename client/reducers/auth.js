import p from '../../shared/protocol'

const initialState = {
    usernameInput:      '',
    passwordInput:      '',
    user:               null,
    token:              null,
    loginModal:         false,
    failState:          false,
    feedback: {
        type:           '',
        message:        ''
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case p.REGISTRATION_ATTEMPT:
            return {
                ...state,
                failState: false
            }

        case p.RESET_LOGIN_FAILURE:
            return {
                ...state,
                failState: false,
                feedback: initialState.feedback
            }

        case p.LOGIN_DENIED_BAD_DETAILS:
            return {
                ...state,
                failState: true,
                feedback: {
                    type: action.data.type,
                    message: action.data.message
                }
            }

        case p.LOGIN_FORM_UPDATE_USERNAME:
            return {
                ...state,
                failState: false,
                usernameInput: action.data
            }

        case p.LOGIN_FORM_UPDATE_PASSWORD:
            return {
                ...state,
                failState: false,
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
                failState: false,
                usernameInput: '',
                passwordInput: ''
            }

        case p.LOGIN_ACCEPTED:
            return {
                ...state,
                user:       action.data.username,
                failState:  false,
                loginModal: false,
                usernameInput: '',
                passwordInput: ''
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
