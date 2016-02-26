import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import SiteBar from './sitebar'
import Layout from './layout'
import AddMediaModal from './add-media-modal'
import LoginModal from './login'
import SettingsModal from './settings'

import config from '../../config'

function mapStateToProps(state) {
    return {
        bodyStyles: state.settings.bodyStyles,
        fluid: state.layout.fluid
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

    componentDidMount() {
        easyrtc.setSocketUrl(`:${config.tubeServerPort}`)
    }

    render() {
        const fluidStyle = this.props.fluid ? { width: '100%' } : {}

        return (
            <div style={this.props.bodyStyles} id="app">
                <SiteBar />
                <div id="goontube" style={fluidStyle}>
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
