/**
 * @file Exports the protocol used to mediate goontube actions between client, server, and Redux.
 * @since 1.0.0
 */
export default {
    CLIENT_HELLO:               'CLIENT_HELLO',
    AUTHENTICATION_ATTEMPT:     'AUTHENTICATION_ATTEMPT',
    AUTHENTICATION_RESPONSE:    'AUTHENTICATION_RESPONSE',
    LOGIN_ACCEPTED:             'LOGIN_ACCEPTED',
    LOGIN_DENIED_BAD_DETAILS:   'LOGIN_DENIED_BAD_DETAILS',
    LOGIN_DENIED_NOT_EXIST:     'LOGIN_DENIED_NOT_EXIST',
    LOGOUT_USER:                'LOGOUT_USER',
    CREATE_NAME_TOO_SHORT:      'CREATE_NAME_TOO_SHORT',
    CREATE_NAME_TOO_LONG:       'CREATE_NAME_TOO_LONG',
    CREATE_NAME_BAD_CHARACTERS: 'CREATE_NAME_BAD_CHARACTERS',
    CREATE_PASS_TOO_SHORT:      'CREATE_PASS_TOO_SHORT',
    CREATE_EMAIL_TOO_SHORT:     'CREATE_EMAIL_TOO_SHORT',
    CREATE_NOT_EMAIL_ADDRESS:   'CREATE_NOT_EMAIL_ADDRESS',
    JOIN_ROOM:                  'JOIN_ROOM',
    LEAVE_ROOM:                 'LEAVE_ROOM',
    SEND_CHAT_MESSAGE:          'SEND_CHAT_MESSAGE',
    SEND_PRIVATE_MESSAGE:       'SEND_PRIVATE_MESSAGE',
    SERVER_BROADCAST_MESSAGE:   'SERVER_BROADCAST_MESSAGE',
    SERVER_PRIVATE_MESSAGE:     'SERVER_PRIVATE_MESSAGE',
    REQUEST_ADD_MEDIA_BY_URL:   'REQUEST_ADD_MEDIA_BY_URL'
}
