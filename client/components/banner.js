import React from 'react'
import { Col } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import p from '../../shared/protocol'

function mapStateToProps(state) {
    return {
        src:                state.banner.possibilities[state.banner.currentBannerIndex],
        index:              state.banner.currentBannerIndex,
        heightBase:         state.layout.heightbase,
        bannerWidth:        state.layout.banner.width,
        bannerHeightUnits:  state.layout.banner.height
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClick: () => {
            dispatch({
                type: p.BANNER_NEW_RANDOM_BANNER
            })
        }
    }
}

class Banner extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        this.props.onClick()
    }

    render() {
        return (
            <Col xs={this.props.bannerWidth}>
                <div className="banner">
                    <img {...this.props} className="banner-image" />
                </div>
            </Col>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
