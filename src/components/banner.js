import React from 'react'
import ReactDOM from 'react-dom'
import p from '../protocol'

class Banner extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        let possibilities   = this.context.store.getState().get('banner').possibilities
        let newBannerChoice = Math.floor(Math.random() * possibilities.length)
        let lastBannerIndex = newBannerChoice

        this.context.store.dispatch({
            type: p.BANNER_NEW_BANNER,
            data: newBannerChoice
        })

        this.context.store.subscribe(() => {
            if(lastBannerIndex !== this.context.store
                .getState()
                .get('banner').currentBannerIndex) {
                    this.forceUpdate()
            }
        })
    }

    onClick() {
        let possibilities = this.context.store.getState().get('banner').possibilities
        let newBannerChoice = Math.floor(Math.random() * possibilities.length)

        this.context.store.dispatch({
            type: p.BANNER_NEW_BANNER,
            data: newBannerChoice
        })
    }

    render() {
        let bannerImgSrc = this.context.store.getState().getIn(['banner', 'possibilities'])
            [this.context.store.getState().get('banner').currentBannerIndex]

        return (
            <div className="banner">
                <img onClick={() => this.onClick()} src={bannerImgSrc} className="banner-image" />
            </div>
        )
    }
}

Banner.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default Banner
