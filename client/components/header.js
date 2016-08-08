import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import Banner from './banner'
import Webcams from './webcams'

function mapStateToProps(state) {
    return {
        showBanner:     state.settings.showBanner,
        showWebcams:    state.settings.showWebcams,
        name:           state.room.name,
        motd:           state.room.motd,
        playingTitle:   state.room.media.title,
        playbackPos:    state.room.media.position
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setNewTime: (ev) => dispatch({ type: 'REQUEST_SET_POSITION', data: ev.target.value })
    }
}

class Header extends Component {
    constructor(props) {
        super(props)
    }

    renderBanner() {
        if(this.props.showBanner) {
            return <Banner />
        } else {
            return <div />
        }
    }

    renderWebcamBlock() {
        if(this.props.showWebcams) {
            return <Webcams />
        } else {
            return <div />
        }
    }

    render() {
        return (
            <header>
                {this.renderBanner()}
                {this.renderWebcamBlock()}
            </header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
