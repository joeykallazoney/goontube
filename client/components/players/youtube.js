import React from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        videoId:            state.room.media.id,
        startTime:          state.room.media.startTime,
        heightBase:         state.layout.heightbase,
        playerWidth:        state.layout.player.width,
        playerHeightUnits:  state.layout.player.height,
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        syncTime: (player, startTime) => {
            let secondsPassed = (Math.ceil( (Date.now() - startTime) / 1000))
            let offsetMargin = 5
            if (Math.abs(player.getCurrentTime() - secondsPassed) > offsetMargin) {
                player.seekTo(secondsPassed)
            }
        }
    }
}

class YouTubePlayer extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    onReady() {
    }

    onStateChange() {
    }

    render() {
        const options = {
            width:          '100%',
            height:         this.props.playerHeightUnits * this.props.heightBase,
            playerVars: {
                autoplay:   1
            }
        }

        return (
            <div id="player">
                <YouTube
                    ref="ytPlayer"
                    videoId={this.props.videoId}
                    opts={options}
                    onReady={this.onReady}
                    onPlay={(ev) => this.props.syncTime(ev.target, this.props.startTime)}
                    onStateChange={this.onStateChange} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YouTubePlayer)
