import YouTube from 'react-youtube'

class YouTubePlayer {
    constructor(props, context) {
        super(props, context)

        this.state = {
        }
    }

    _onReady(event) {

    }

    _onStateChange(event) {

    }

    render() {
        const videoID = this.context.store
            .getState()
            .getIn(['media', 'id'])
        const options = {
            height:    550,
            width:     320,
            playerVars: {
                autoplay: 1
            }
        }

        return (
            <div id="player">
                <YouTube videoId={videoID}
                    opts={options}
                    onReady={_this.onReady}
                    onStateChange={_this.onStateChange} />
            </div>
        )
    }
}

YouTubePlayer.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default YouTubePlayer
