import React from 'react'
import ReactDOM from 'react-dom'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'
import { connect } from 'react-redux'

import DailyMotion from './players/dailymotion'
import YouTube from './players/youtube'
import Vimeo from './players/vimeo'

function mapStateToProps(state) {
    return {
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

Player.mixins = [PureRenderMixin]

export default connect(mapStateToProps, mapDispatchToProps)(Player)
