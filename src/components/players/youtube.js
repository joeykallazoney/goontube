import React from 'react'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        videoId:  state.getIn(['room', 'media']).id,
        position: state.getIn(['room', 'media']).position
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
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
            height:         '100%',
            playerVars: {
                autoplay:   0
            }
        }

        return (
            <div id="player">
                <YouTube videoId={this.props.videoId}
                    opts={options}
                    onReady={this.onReady}
                    onStateChange={this.onStateChange} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YouTubePlayer)
