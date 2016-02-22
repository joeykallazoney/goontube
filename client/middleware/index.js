import { applyMiddleware, compose } from 'redux'
import sagaMiddleware from 'redux-saga'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import invariant from 'redux-immutable-state-invariant'
import webSocketMiddleware from './websocket'
import rootSaga from '../sagas'

export default applyMiddleware(
    invariant(),
    multi,
    thunk,
    webSocketMiddleware,
    sagaMiddleware(rootSaga)
)
