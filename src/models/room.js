import Sequelize from 'sequelize'
import p from '../protocol'
import { makePacket } from '../util'

class Room {
    static createSchema(db) {
        return db.define('room', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            room_name: Sequelize.STRING
        }, {
            tableName: 'rooms',
            timestamps: false
        })
    }

    constructor() {}
}

export default Room
