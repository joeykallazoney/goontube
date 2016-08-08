/**
 * @file Exports a React component displaying other webcam users in the room.
 *
 * Expects EasyRTC client bundle to have been loaded and available in the global
 * context.
 */
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { makePacket } from '../../shared/util'
import p from '../../shared/protocol'

function mapStateToProps(state) {
    return {
        webcamsWidth:   state.layout.webcams.width,
        roomName:       state.room.name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        gotEasyRTCID: easyRtcId => dispatch({ type: p.SET_EASYRTC_ID, data: easyRtcId }),
        receiveOccupants: (name, occupants, primary) => {
            console.log(occupants)
        },
        webcamsConnected: (gotConnection, err) => {
            if(err) {
                console.error(`Webcam connection error: ${err}`)
                return
            }

            console.log('Got new connection!')
        },
        webcamsDisconnected: () => {
            console.log('Lost webcam connections')
        }
    }
}

const OwnWebcam = (props) =>
    <video style={{float: 'left'}}
        id="self"
        width="120"
        height="90"
        muted="muted"
        id="self" />

const OtherWebcam = (props) =>
    <video id={props.id}
        width="120"
        height="90" />

class Webcams extends Component {
    constructor(props) {
        super(props)
    }

    connect() {
        easyrtc.enableDebug(true)
        easyrtc.setStreamAcceptor((id, stream) => this.streamAcceptor(id, stream))
        easyrtc.setOnStreamClosed(id => this.streamClosed(id))
        easyrtc.enableAudio(false)
        easyrtc.enableAudioReceive(false)
        easyrtc.setDisconnectListener(() => this.props.webcamsDisconnected())
        easyrtc.setRoomOccupantListener((name, occ, primary) => this.props.receiveOccupants(name, occ, primary))
        easyrtc.easyApp(this.props.roomName, 'self', ['caller'], (id) => this.props.gotEasyRTCID(id))
        easyrtc.setGotConnection(() => this.props.webcamsConnected())
    }

    streamAcceptor(caller, stream) {
        console.log(`New stream: ${caller}`)
    }

    streamClosed(easyRtcId) {
        console.log(`Lost stream: ${easyRtcId}`)
    }

    componentDidMount() {
        this.connect()

        console.log('Webcams mounted.')
    }

    componentWillUnmount() {
        easyrtc.hangupAll()
        easyrtc.disconnect()

        console.log('Webcams unmounted.')
    }

    render() {
        return (
            <Col xs={this.props.webcamsWidth}>
                <OwnWebcam />
                <OtherWebcam id="caller" />
            </Col>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Webcams)
