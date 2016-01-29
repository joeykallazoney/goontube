import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import DailyMotion from './players/dailymotion'
import YouTube from './players/youtube'
import Vimeo from './players/vimeo'

function mapStateToProps(state) {
    return {
        position:   state.getIn(['media', 'position']),
        provider:   state.getIn(['media', 'provider']),
        videoId:    state.getIn(['media', 'id'])
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    }
}

class Player extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="player">
                <YouTube />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
