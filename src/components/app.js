import React from 'react'
import ReactDOM from 'react-dom'

import Banner from './banner'
import Chat from './chat'
import Users from './users'
import Player from './player'
import Playlist from './playlist'
import ContentPane from './content-pane'
import Search from './search'
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
                    <Chat socket={this.props.socket} />
                    <Playlist />
                    <ContentPane />
                    <Search />
                </Layout>
            </div>
        )
    }
}

Goontube.propTypes = {
    socket: React.PropTypes.object.isRequired
}
Goontube.contextTypes = {
    store:  React.PropTypes.object.isRequired
}

export default Goontube
