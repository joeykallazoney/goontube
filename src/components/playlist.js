import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        items: state.getIn(['room', 'playlist'])
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    }
}

let PlaylistEntry = (props) =>
    <div className="playlist-item">
        {props.title}
    </div>

class Playlist extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="playlist">
                {this.props.items.map(i => (
                    <PlaylistEntry {...i} {...this.props.entries} />
                ))}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
