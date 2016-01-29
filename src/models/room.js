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

    removeUser(user) {
        let index

        if(-1 !== (index = this.members.indexOf(user))) {
            this.members.splice(index, 1)
        }

        this.updateRoomUsersList()
    }

    addUser(user) {
        this.members.push(user)

        this.updateRoomUsersList()
    }

    updateRoomUsersList() {
        let packet = this.makeUserListPacket()

        this.members.map(u => u.sendPacket(packet.type, packet.data))
    }

    makeUserListPacket() {
        return {
            type: p.ROOM_LIST_UPDATE,
            data: this.members.map(user => {
                return {
                    username: (null != user.user) ? user.user.username : 'unnamed'
                }
            })
        }
    }

    static loadAll() {
        return new Promise((res, rej) => {
            res(null)
        })
    }

    constructor(serverContext) {
        this.context = serverContext
        this.members = []
    }
}

export default Room
