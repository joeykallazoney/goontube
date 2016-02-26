import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Col } from 'react-bootstrap'

import DailyMotion from './players/dailymotion'
import YouTube from './players/youtube'
import Vimeo from './players/vimeo'

function mapStateToProps(state) {
    return {
        heightBase:         state.layout.heightbase,
        playerWidth:        state.layout.player.width,
        playerHeightUnits:  state.layout.player.height,
        showPlayer:         state.settings.showPlayer,
        media:              state.room.media
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
        if(!this.props.showPlayer) {
            return (
                <div className="hidden-player"></div>
            )
        }

        let providerMapper = {
            'youtube' : <YouTube />
        }
        let reactProvider = providerMapper[this.props.media.provider] || 'Loading...'

        return (
            <Col xs={this.props.playerWidth}>
                <div className="player">
                    {reactProvider}
                </div>
            </Col>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Player)
