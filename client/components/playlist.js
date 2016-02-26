import React, { PropTypes } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { ButtonToolbar, Button, Glyphicon, Row, Col } from 'react-bootstrap'
import { DragSource, DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { compose } from 'redux'
import p from '../../shared/protocol'
import { makePacket } from '../../shared/util'
import moment from 'moment'
import FlipMove from 'react-flip-move'

function mapStateToProps(state) {
    return {
        items:                state.room.playlist,
        heightBase:           state.layout.heightbase,
        playlistWidth:        state.layout.playlist.width,
        playlistHeightUnits:  state.layout.playlist.height
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        onAddMediaClicked: (ev) => dispatch({ type: p.ADD_MEDIA_CLICK }),
        onSkip: (ev) => dispatch({ type: p.PLAYLIST_SKIP_REQUEST, send: true }),
        onShuffle: (ev) => dispatch({ type: p.PLAYLIST_SHUFFLE_REQUEST, send: true }),
        onExchange: (a, b) => dispatch({ type: p.PLAYLIST_EXCHANGE_REQUEST, send: true, data: { a, b }}),
        onDeleteEntry: (ev, id) => dispatch({ type: p.REQUEST_DELETE_PLAYLIST_ENTRY, send: true, data: id }),
        onWebcamToggle: (ev) => dispatch({ type: p.TOGGLE_WEBCAMS })
    }
}

const entryTarget = {
    canDrop: function (props, monitor) {
        return true
    },

    hover: function (props, monitor, component) {
    },

    drop(props, monitor) {
        let item = monitor.getItem()

        return {
            exchange:   true,
            a:          item.id,
            b:          props.id
        }
    }
}

var entrySource = {
    beginDrag: function (props) {
        return {
            id: props.id
        }
    },

    endDrag: function (props, monitor, component) {
        let item = monitor.getItem()
        let result = monitor.getDropResult()

        if(null !== result && true === result.exchange) {
            component.props.dndRequest(result.a, result.b)
        }
    }
}

function collectTarget(connect, monitor) {
    return {
        connectDropTarget:  connect.dropTarget(),
        isOver:             monitor.isOver(),
        isOverCurrent:      monitor.isOver({ shallow: true }),
        canDrop:            monitor.canDrop(),
        itemType:           monitor.getItemType()
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource:  connect.dragSource(),
        isDragging:         monitor.isDragging()
    }
}

class PlaylistEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { accepts, isOver, connectDragSource, isDragging, canDrop, connectDropTarget, lastDroppedItem } = this.props

        const secs = parseInt(this.props.duration_ms / 1000 % 60),
            mins = parseInt((this.props.duration_ms / (1000 * 60)) % 60),
            hours = parseInt((this.props.duration_ms / (1000 * 60 * 60)) % 24)

        return connectDragSource(connectDropTarget(
            <div className="entry" style={{ backgroundColor: isOver ? '#383838' : 'transparent', opacity: isDragging ? 0.5 : 1 }}>
                <Row>
                    <Col xs={8}>
                        <div className="title">{this.props.title}</div>

                        <div className="meta">
                            <div className="duration">
                            {hours ? hours + ' : ' : ''}{mins} : {secs<10 ? '0':''} {secs}
                            </div>
                        </div>
                    </Col>

                    <Col xs={4}>
                        <div className="pull-right actions">
                            <ButtonToolbar>
                                <Button onClick={(ev) => {
                                    this.props.onDeleteEntry(ev, this.props.id)
                                }}>
                                    <Glyphicon glyph="trash" />
                                </Button>
                                <Button href={`https://youtu.be/${this.props.id}`} target="_blank">
                                    <Glyphicon glyph="link" />
                                </Button>
                            </ButtonToolbar>
                        </div>
                    </Col>
                </Row>
            </div>
        ))
    }
}

const DraggableEntry = DragSource('PLAYLIST_ENTRY', entrySource, collect)(PlaylistEntry)
const DroppableTarget = DropTarget('PLAYLIST_ENTRY', entryTarget, collectTarget)(DraggableEntry)

class Playlist extends React.Component {
    constructor(props) {
        super(props)
    }

    renderPlaylist() {
        return this.props.items.map(
            i => <DroppableTarget dndRequest={this.props.onExchange} onDeleteEntry={this.props.onDeleteEntry} {...i} key={i.id} />
        )
    }

    renderPlaylistToolbar() {
        return (
            <ButtonToolbar>
                <Button onClick={(e) => this.props.onAddMediaClicked(e)}>Add Media</Button>
                <Button onClick={(e) => this.props.onSkip(e)}>Skip</Button>
                <Button onClick={(e) => this.props.onShuffle(e)}>Shuffle</Button>
                <Button onClick={(e) => this.props.onWebcamToggle()}>Webcams</Button>
            </ButtonToolbar>
        )
    }

    render() {
        return (
            <Col xs={this.props.playlistWidth}>
                <div style={{height: (this.props.playlistHeightUnits * this.props.heightBase) + 'px'}} className="playlist-container">
                    <div className="controls" style={{ backgroundColor: 'rgb(43, 43, 43)' }}>
                        { this.renderPlaylistToolbar() }
                    </div>
                    <ul className="playlist" style={{height: ((this.props.playlistHeightUnits * this.props.heightBase) - 40) + 'px', overflowY: 'scroll' }}>
                        <FlipMove easing="cubic-bezier(0.39,0,0.45,1.4)">
                            { this.renderPlaylist() }
                        </FlipMove>
                    </ul>
                </div>
            </Col>
        )
    }
}

const DragDropPlaylist = DragDropContext(HTML5Backend)(Playlist)

export default connect(mapStateToProps, mapDispatchToProps)(DragDropPlaylist)
