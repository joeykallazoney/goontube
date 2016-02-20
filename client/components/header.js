import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import Banner from './banner'

function mapStateToProps(state) {
    return {
        name: state.room.name,
        motd: state.room.motd,
        playingTitle: state.room.media.title,
        playbackPos: state.room.media.position
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

    // collapsible admin options: blacklist video, info, override pos with range slider
    render() {
        return (
            <header>
            </header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
