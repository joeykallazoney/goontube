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
                <Banner />
                <Panel collapsible header={this.props.playingTitle}>
                    <div>
                        <label for="position">Override Playback Position</label>
                        <input name="position" id="position" type="range" min="0" value={this.props.playbackPos} max={this.props.duration} step="1000" />
                    </div>
                </Panel>
            </header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
