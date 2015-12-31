import React from 'react'
import ReactDOM from 'react-dom'

import DailyMotion from './players/dailymotion'
import YouTube from './players/youtube'
import Vimeo from './players/vimeo'

class Player extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="player">
                <YouTube />
            </div>
        )
    }
}

export default Player
