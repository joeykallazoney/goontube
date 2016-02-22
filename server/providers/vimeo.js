import fetch from 'isomorphic-fetch'

class Vimeo {
    static fetchMetaById(videoId) {
        return new Promise((res, rej) => {
            fetch(
                `//vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${videoId}`
            )
            .then(results => results.json())
            .then(data => {
                try {
                    let parsed  = {
                        id:             videoId,
                        title:          data.title,
                        description:    data.description,
                        duration:       data.duration * 1000
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

    static getName() {
        return 'Vimeo'
    }

    static test() {
        return /vimeo\.com\/(\d+)$/i
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

export default Vimeo
