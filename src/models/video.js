/**
 * @class Abstracts away information stored about a particular video.
 * @since 1.0.0
 */
import config from '../../config'

class Video {
    static createSchema(db) {
       return db.define('video', {
       })
    }

    constructor(id) {
    }
}

export default Video
