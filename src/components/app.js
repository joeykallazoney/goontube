import React from 'react'
import ReactDOM from 'react-dom'

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

                </Layout>
            </div>
        )
    }
}

export default Goontube
