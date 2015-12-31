import React from 'react'
import ReactDOM from 'react-dom'

import Banner from './banner'
import Chat from './chat'
import Users from './users'
import Player from './player'
import Playlist from './playlist'
import ContentPane from './content-pane'
import Layout from './layout'

class Goontube extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="goontube">
                <Layout>
                    <Banner />
                    <Player />
                    <Chat />
                    <Playlist />
                    <ContentPane />
                </Layout>
            </div>
        )
    }
}

Goontube.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default Goontube
