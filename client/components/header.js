import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import Banner from './banner'

function mapStateToProps(state) {
    return {
        name: state.room.name,
        motd: state.room.motd,
        playingTitle: state.room.media.title
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header>
                <Banner />
                <Panel collapsible header={`Now playing: ${this.props.playingTitle}`}>
                    <div></div>
                </Panel>
            </header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
