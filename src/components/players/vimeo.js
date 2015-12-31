import React from 'react'
import Vimeo from 'react-vimeo'

class VimeoPlayer extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
        }
    }

    onError(error) {

    }

    onReady(event) {

    }

    onPlay(event) {

    }

    onSeek(event) {

    }

    render() {
        const videoID = this.context.store
            .getState()
            .get('media').id
        const options = {
            width:     550,
            height:    320,
            playerVars: {
                autoplay: 1
            }
        }

        return (
            <div id="player">
                <Vimeo videoId={videoID}
                    opts={options}
                    onError={this.onError}
                    onReady={this.onReady}
                    onPlay={this.onPlay}
                    onSeek={this.onSeek} />
            </div>
        )
    }
}

VimeoPlayer.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default VimeoPlayer
