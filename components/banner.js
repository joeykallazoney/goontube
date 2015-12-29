import React from 'react'
import ReactDOM from 'react-dom'
import ExecutionEnvironment from 'exenv'
import p from '../protocol'

class Banner extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        if(ExecutionEnvironment.canUseDOM) {
            let lastBannerIndex = this.context.store
                .getState()
                .getIn(['banner', 'currentBannerIndex'])

            this.context.store.subscribe(() => {
                if(lastBannerIndex !== this.context.store
                    .getState()
                    .getIn(['banner', 'currentBannerIndex'])) {
                        this.forceUpdate()
                }
            })
        }
    }

    onClick() {
        let p = this.context.store.getState().getIn(['banner', 'possibilities'])
        let newBannerChoice = Math.floor(Math.random() * p.length)

        this.context.store.dispatch({
            type: BANNER_NEW_BANNER,
            data: newBannerChoice
        })
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
