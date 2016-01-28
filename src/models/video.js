/**
 * @class Abstracts away information stored about a particular video.
 * @since 1.0.0
 */
import Sequelize from 'sequelize'
import config from '../../config'

class Video {
    static createSchema(db) {
       return db.define('video', {
           type:            Sequelize.STRING,
           id: {
               type:        Sequelize.INTEGER,
               primaryKey:  true,
               autoIncrement: true
           },
           duration_ms:     Sequelize.INTEGER,
           title:           Sequelize.STRING,
           flags:           Sequelize.INTEGER,
           first_added_by:  Sequelize.STRING,
           video_negs:      Sequelize.INTEGER,
           video_karma:     Sequelize.INTEGER,
           views:           Sequelize.INTEGER,
           last_adding_by:  Sequelize.STRING
       })
    }

    constructor(serverContext, id) {
        this._video = serverContext.data.Video.findOne({
            where: {
                id: id
            }
        })
    }
}

export default Video
