import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        items: state.getIn(['room', 'playlist']).toArray()
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    }
}

let PlaylistEntry = (props) =>
    <div className="item">
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
                    <PlaylistEntry {...i} />
                ))}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
