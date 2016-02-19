import { combineReducers } from 'redux'

import authReducer from './auth'
import bannerReducer from './banner'
import roomReducer from './room'
import searchReducer from './search'
import socketReducer from './socket'

export default combineReducers({
    auth:   authReducer,
    banner: bannerReducer,
    room:   roomReducer,
    search: searchReducer,
    socket: socketReducer
})
