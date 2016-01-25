import React from 'react'
import YouTube from 'react-youtube'

class YouTubePlayer extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
        }
    }

    componentWillUnmount() {

    }

    onReady(event) {

    }

    onStateChange(event) {

    }

    render() {
        const videoID = this.context.store
            .getState()
            .getIn(['media', 'id'])
        const options = {
            width:          '100%',
            height:         '100%',
            playerVars: {
                autoplay:   0
            }
        }

        return (
            <div id="player">
                <YouTube videoId={videoID}
                    opts={options}
                    onReady={this.onReady}
                    onStateChange={this.onStateChange} />
            </div>
        )
    }
}

YouTubePlayer.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default YouTubePlayer
