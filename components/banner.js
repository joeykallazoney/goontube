import React from 'react'
import ReactDOM from 'react-dom'

class Banner extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        if(this.context.store !== null) {
            console.log(this.context.store.getState())
        }
    }

    onClick() {
    }

    render() {
        return (
            <div onclick={() => this.onClick()} className="banner">
                <img src={null} className="banner-image" />
            </div>
        )
    }
}

Banner.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default Banner
