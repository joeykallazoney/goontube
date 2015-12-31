import React from 'react'
import ReactDOM from 'react-dom'

import Banner from './banner'

class Goontube extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="goontube">
                <h1>Goontube!</h1>

                <Banner />
            </div>
        )
    }
}

export default Goontube
