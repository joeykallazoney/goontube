/**
 * @module Exports a React component class abstracting the app layout.
 * @since 1.0.0
 */
import React from 'react'
import { connect } from 'react-redux'
import { Grid, Col, Row } from 'react-bootstrap'

import Header from './header'
import Footer from './footer'
import Users from './users'
import Player from './player'
import Chat from './chat'
import Search from './search'
import Playlist from './playlist'
import ContentPane from './content-pane'

function mapStateToProps(state) {
    return {
        heightBase:         state.layout.heightbase,
        playerWidth:        state.layout.player.width,
        playerHeightUnits:  state.layout.player.height,
        chatWidth:          state.layout.chat.width,
        chatHeightUnits:    state.layout.chat.height
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    }
}

class Layout extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="layout">
                <Grid fluid>
                    <Row>
                        <Header />
                        <Player />
                        <Chat />
                        <Playlist />
                        <ContentPane />
                        <Footer />
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
