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
        items: state.room.playlist
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
            exchange: true,
            a: item.id,
            b: props.id
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
            console.log(`swap playlist entries [${result.a}]->[${result.b}]`)
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
        const { accepts, isOver, connectDragSource, isDragging, canDrop, connectDropTarget, lastDroppedItem } = this.props
        const duration = moment({ milliseconds: this.props.duration_ms }).toObject()

        return connectDragSource(connectDropTarget(
            <div className="entry" style={{ backgroundColor: isOver ? '#383838' : 'transparent', opacity: isDragging ? 0.5 : 1 }}>
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
        ))
    }
}

const DraggableEntry = DragSource('PLAYLIST_ENTRY', entrySource, collect)(PlaylistEntry)
const DroppableTarget = DropTarget('PLAYLIST_ENTRY', entryTarget, collectTarget)(DraggableEntry)

class Playlist extends React.Component {
    constructor(props) {
        super(props)
    }

    renderPlaylist(props) {
        return this.props.items.map(i => <DroppableTarget onDeleteEntry={props.onDeleteEntry} {...i} key={i.id} />
        )
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

const DragDropPlaylist = DragDropContext(HTML5Backend)(Playlist)

export default connect(mapStateToProps, mapDispatchToProps)(DragDropPlaylist)
