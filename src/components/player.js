import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import DailyMotion from './players/dailymotion'
import YouTube from './players/youtube'
import Vimeo from './players/vimeo'

function mapStateToProps(state) {
    return {
        media:    state.getIn(['room', 'media'])
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
        let providerMapper = {
            'youtube' : <YouTube />
        }
        let reactProvider = providerMapper[this.props.media.provider] || 'Loading...'
        console.log('why...')
        console.log(this)

        return (
            <div className="player">
                {reactProvider}
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Player)
