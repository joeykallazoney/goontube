import { combineReducers } from 'redux'

import addReducer from './add'
import appReducer from './app'
import authReducer from './auth'
import bannerReducer from './banner'
import chatReducer from './chat'
import layoutReducer from './layout'
import roomReducer from './room'
import searchReducer from './search'
import settingsReducer from './settings'
import socketReducer from './socket'

export default combineReducers({
    add:        addReducer,
    app:        appReducer,
    auth:       authReducer,
    banner:     bannerReducer,
    chat:       chatReducer,
    layout:     layoutReducer,
    room:       roomReducer,
    search:     searchReducer,
    settings:   settingsReducer,
    socket:     socketReducer
})
