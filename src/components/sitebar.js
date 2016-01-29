import React from 'react'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        user: state.getIn(['auth', 'user'])
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

class SiteBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="sitebar">
                {null !== this.props.user ? (
                    <div className="logged-in">
                        Currently logged in as {this.props.user}
                    </div>
                ) : null}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteBar)
