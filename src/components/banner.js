import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import p from '../protocol'

function mapStateToProps(state) {
    let possibilities = state.banner.possibilities,
        index = state.banner.currentBannerIndex

    return {
        src: possibilities[index]
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
            <div className="banner">
                <img {...this.props} className="banner-image" />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
