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
           last_added_by:   Sequelize.STRING
       }, {
           tableName:       'videos',
           timestamps:     false
       })
    }

    static getSomeRandomVideos(numberVideos, ctx) {
        return new Promise((res, rej) => {
            ctx.data
                .Video
                .findAll(
                    {
                        limit: numberVideos,
                        order: [
                            Sequelize.fn('RANDOM'),
                        ]
                    })
                .then(videos => {
                    res(videos)
                })
        }, (err) => {
            console.log(`Failed to populate from database: ${err.toString()}`)
            rej(err)
        })
    }

    loadById(providerType, id) {
        return new Promise((res, rej) => {
            this.context.data
                .Video
                .findOne({ where: { type: providerType, id: id } })
                .then(video => {
                    this.video = video
                    res(this)
                })
        }, (err) => {
            console.log(`Failed to populate from database: ${err.toString()}`)
            rej(err)
        })
    }

    constructor(serverContext) {
        this.context = serverContext
    }
}

export default Video
