import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import FlipMove from 'react-flip-move'

function mapStateToProps(state) {
    return {
        items: state.room.playlist
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    }
}

class PlaylistEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {this.props.title}
            </div>
        )
    }
}

class Playlist extends React.Component {
    constructor(props) {
        super(props)
    }

    renderPlaylist() {
        return this.props.items.map(i => <PlaylistEntry {...i} key={i.id} />)
    }

    render() {
        return (
            <ul className="playlist" height={400}>
                <FlipMove easing="cubic-bezier(0.39,0,0.45,1.4)">
                    { this.renderPlaylist() }
                </FlipMove>
            </ul>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
