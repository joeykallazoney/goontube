import React from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        videoId:  state.room.media.id,
        startTime: state.room.media.startTime
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    }
}

function syncTime(player, startTime) {
    let secondsPassed = (Math.ceil( (Date.now() - startTime) / 1000))
    let offsetMargin = 5
    if (Math.abs(player.getCurrentTime() - secondsPassed) > offsetMargin) {
        player.seekTo(secondsPassed)
    }
}


class YouTubePlayer extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    onReady() {
    }

    onPlay(event, props) {
        window.tp = event.target

        syncTime(event.target, props.startTime)
    }

    onStateChange() {
    }

    render() {
        const options = {
            width:          '100%',
            height:         '100%',
            playerVars: {
                autoplay:   1
            }
        }

        return (
            <div id="player">
                <YouTube videoId={this.props.videoId}
                    opts={options}
                    onReady={this.onReady}
                    onPlay={(event) => this.onPlay(event, this.props)}
                    onStateChange={this.onStateChange} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YouTubePlayer)
