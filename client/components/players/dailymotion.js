import React from 'react'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

class DailyMotionPlayer extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
        }
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div id="player">
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyMotionPlayer)
