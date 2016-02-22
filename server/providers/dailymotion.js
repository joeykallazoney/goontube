import fetch from 'isomorphic-fetch'

class DailyMotion {
    static fetchMetaById(videoId) {
        return new Promise((res, rej) => {
            fetch(
                `//api.dailymotion.com/video/${videoId}?fields=id,title,duration,description`
            )
            .then(results => results.json())
            .then(data => {
                try {
                    let parsed = {
                        id:             videoId,
                        title:          data.title,
                        duration:       data.duration * 1000,
                        description:    data.description
                    }

                    res(parsed)
                } catch(err) {
                    rej(err)
                }
            })
        })
    }

    static idResult() {
        return 1
    }

    static test() {
        return /dailymotion\.com\/video\/([^\/]+?)_/i
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

export default DailyMotion
