class DailyMotionPlayer {
    constructor(props, context) {
        super(props, context)

        this.state = {
        }
    }

    componentWillUnmount() {
    }

    render() {
        const videoID = this.context.store
            .getState()
            .get('media').id

        return (
            <div id="player">
            </div>
        )
    }
}

VimeoPlayer.contextTypes = {
    store: React.PropTypes.object.isRequired
}

export default DailyMotionPlayer
