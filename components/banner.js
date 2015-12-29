import React from 'react'
import ReactDOM from 'react-dom'
import ExecutionEnvironment from 'exenv'

class Banner extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        if(ExecutionEnvironment.canUseDOM) {
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

if(ExecutionEnvironment.canUseDOM) {
    Banner.contextTypes = {
        store: React.PropTypes.object.isRequired
    }
}

export default Banner
