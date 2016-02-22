import moment from 'moment'
import fetch from 'isomorphic-fetch'

class YouTube {
    static fetchMetaById(videoId, apiKey = '') {
        return new Promise((res, rej) =>
            fetch(
                `//www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=contentDetails,snippet`
            )
            .then(results => results.json())
            .then(data => {
                try {
                    let item    = data.items[0]
                    let parsed  = {
                        id:             videoId,
                        title:          item.snippet.title,
                        description:    item.snippet.description,
                        duration:       moment.duration(
                            item.contentDetails.duration
                        ).asMilliseconds()
                    }

                    res(parsed)
                } catch(err) {
                    rej(err)
                }
            })
        )
    }

    static test() {
        return /youtu(\.be|be\.com)\/watch\?v=([^\/]+?)\/?$/i
    }

    static idResult() {
        return 2
    }

    static getName() {
        return 'YouTube'
    }

    static getVideoIDFromURL(url) {
        return null
    }

    static getTimestampFromURL(url) {
        return -1
    }

    static testURL(url) {
        return false
    }

    constructor(id) {
    }
}

export default YouTube
