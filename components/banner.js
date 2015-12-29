import React from 'react'
import ReactDOM from 'react-dom'

class Banner extends React.Component {
    constructor(props, context) {
        super(props, context)

        console.log(context)
    }

    componentDidMount() {
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

export default Banner
