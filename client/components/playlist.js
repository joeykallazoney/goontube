import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { ButtonToolbar, Button, Glyphicon, Row, Col } from 'react-bootstrap'
import p from '../../shared/protocol'
import { makePacket } from '../../shared/util'
import moment from 'moment'
import FlipMove from 'react-flip-move'

function mapStateToProps(state) {
    return {
        items: state.room.playlist
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        onSkip: (ev) => dispatch({ type: p.PLAYLIST_SKIP_REQUEST }),
        onShuffle: (ev) => dispatch({ type: p.PLAYLIST_SHUFFLE_REQUEST }),
        onDeleteEntry: (ev, id) => dispatch({ type: p.REQUEST_DELETE_PLAYLIST_ENTRY, data: id })
    }
}

class PlaylistEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const duration = moment({ milliseconds: this.props.duration_ms }).toObject()

        return (
            <div className="entry">
                <Row>
                    <Col xs={8}>
                        <div className="title">{this.props.title}</div>

                        <div className="meta">
                            <div className="added-by">added by [name]</div>
                            <div className="duration">
                            {duration.minutes} : {duration.seconds<10 ? '0':''} {duration.seconds}
                            </div>
                        </div>
                    </Col>

                    <Col xs={4}>
                        <div className="pull-right actions">
                            <ButtonToolbar>
                                <Button onClick={(ev) => {
                                    console.log('Delete!')
                                    this.props.onDeleteEntry(ev, this.props.id)
                                }}>
                                    <Glyphicon glyph="trash" />
                                    Delete
                                </Button>
                                <Button href={`https://youtu.be/${this.props.id}`} target="_blank">
                                    <Glyphicon glyph="link" />
                                    Link
                                </Button>
                            </ButtonToolbar>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

class Playlist extends React.Component {
    constructor(props) {
        super(props)
    }

    renderPlaylist(props) {
        return this.props.items.map(i => <PlaylistEntry onDeleteEntry={props.onDeleteEntry} {...i} key={i.id} />)
    }

    render() {
        return (
            <div className="playlist-container">
                <div className="controls" style={{ backgroundColor: 'rgb(43, 43, 43)' }}>
                    <ButtonToolbar>
                        <Button onClick={(e) => this.props.onSkip(e)}>Skip</Button>
                        <Button onClick={(e) => this.props.onShuffle(e)}>Shuffle</Button>
                    </ButtonToolbar>
                </div>
                <ul className="playlist" style={{ height: 300, overflowY: 'scroll' }}>
                    <FlipMove easing="cubic-bezier(0.39,0,0.45,1.4)">
                        { this.renderPlaylist(this.props) }
                    </FlipMove>
                </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
