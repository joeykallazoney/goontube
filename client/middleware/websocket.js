import { applyMiddleware, compose } from 'redux'
import p from '../../shared/protocol'

const webSocketMiddleware = store => next => action => {
    next(action)
}

export default webSocketMiddleware
