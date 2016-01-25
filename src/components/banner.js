import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import p from '../protocol'

function mapStateToProps(state) {
    return {
        possibilities:  state.getIn(['banner', 'possibilities']),
        index:          state.getIn(['banner', 'currentBannerIndex'])
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
        this.context.store.dispatch({
            type: p.BANNER_NEW_RANDOM_BANNER
        })
    }

    render() {
        return (
            <div className="banner">
                <img {...this.props}
                    src={this.props.possibilities.get(this.props.index)}
                    className="banner-image" />
            </div>
        )
    }
}

Banner.contextTypes = {
    store:  React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
