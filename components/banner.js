import React from 'react'
import ReactDOM from 'react-dom'

class Banner extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    onClick() {
    }

    render() {
        return (
            <div onclick={() => this.onClick()} className="banner">
                <img src={this.state.bannerImageSrc} className="banner-image" />
            </div>
        )
    }
}

export default Banner
