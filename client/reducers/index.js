import { combineReducers } from 'redux'

import appReducer from './app'
import authReducer from './auth'
import bannerReducer from './banner'
import chatReducer from './chat'
import layoutReducer from './layout'
import roomReducer from './room'
import searchReducer from './search'
import socketReducer from './socket'

export default combineReducers({
    app:    appReducer,
    auth:   authReducer,
    banner: bannerReducer,
    chat:   chatReducer,
    layout: layoutReducer,
    room:   roomReducer,
    search: searchReducer,
    socket: socketReducer
})