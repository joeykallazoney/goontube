import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import Banner from './banner'

function mapStateToProps(state) {
    return {
        showBanner: state.settings.showBanner,
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

    renderBanner() {
        const isVisible = this.props.showBanner

        if(!isVisible) {
            return (
                <div></div>
            )
        } else {
            return (
                <Banner />
            )
        }
    }

    // collapsible admin options: blacklist video, info, override pos with range slider
    render() {
        return (
            <header>
                {this.renderBanner()}
            </header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
