import React from 'react'

class DailyMotionPlayer extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
        }
    }

    componentWillUnmount() {
    }

    render() {
        const videoID = this.context.store
            .getState()
            .get('media').id

        return (
            <div id="player">
            </div>
        )
    }
}

DailyMotionPlayer.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default DailyMotionPlayer
