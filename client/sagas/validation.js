import { takeEvery, takeLatest } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'
import p from '../../shared/protocol'

function* videoValidationSaga(action) {
    yield put({ type: p.REQUEST_VALIDATION_FOR_URL, send: true, data: action.data })
    let response = yield take(p.VALIDATION_RESPONSE)

    if(response.data.validated) {
        yield put({ type: p.VALIDATION_SUCCEEDED, data: action.data })
    } else {
        yield put({ type: p.VALIDATION_FAILED, data: action.data })
    }
}

function* validationSaga() {
    yield* takeLatest('ADD_MEDIA_INPUT', videoValidationSaga)
}

export default validationSaga
