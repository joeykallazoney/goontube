import React from 'react'
import ReactDOM from 'react-dom'

import Chat from './chat'
import Header from './header'
import Users from './users'
import Player from './player'
import Playlist from './playlist'
import ContentPane from './content-pane'
import Search from './search'
import SiteBar from './sitebar'
import Layout from './layout'
import LoginModal from './login'

import { connect } from 'react-redux'

class Goontube extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div id="app">
                <SiteBar />
                <div id="goontube">
                    <Layout>
                        <Header />
                        <Player />
                        <Chat />
                        <Playlist />
                        <ContentPane />
                        <Search />
                    </Layout>
                </div>
                <div id="modals">
                    <LoginModal />
                </div>
            </div>
        )
    }
}

export default connect()(Goontube)
