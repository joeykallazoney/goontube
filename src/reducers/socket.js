import p from '../protocol'

const initialState = {
    ready:      false,
    socket:     null,
    buffer:     [],
    dataIn:     0,
    dataOut:    0
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        default:
            return state
    }
}
