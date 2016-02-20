import React from 'react'
import ReactDOM from 'react-dom'

import SiteBar from './sitebar'
import Layout from './layout'
import AddMediaModal from './add-media-modal'
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
                    <Layout />
                </div>
                <div id="modals">
                    <AddMediaModal />
                    <LoginModal />
                </div>
            </div>
        )
    }
}

export default connect()(Goontube)
