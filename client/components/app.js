import React from 'react'
import ReactDOM from 'react-dom'

import SiteBar from './sitebar'
import Layout from './layout'
import AddMediaModal from './add-media-modal'
import LoginModal from './login'
import SettingsModal from './settings'

import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        bodyStyles: state.settings.bodyStyles
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
    }
}

class Goontube extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div style={this.props.bodyStyles} id="app">
                <SiteBar />
                <div id="goontube">
                    <Layout />
                </div>
                <div id="modals">
                    <AddMediaModal />
                    <LoginModal />
                    <SettingsModal />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goontube)
