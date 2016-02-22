import { fork, call } from 'redux-saga/effects'
import validationSaga from './validation'

export default function* rootSaga() {
    yield fork(validationSaga)
}
