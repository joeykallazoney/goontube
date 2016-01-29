import Sequelize from 'sequelize'
import p from '../protocol'
import { makePacket } from '../util'

import Video from './video'

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

    makePlaylistUpdatePacket() {
        return {
        }
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

    heartbeat(context) {
        if(!this.playlist.length && !this.fetchingEntries) {
            this.fetchingEntries = true

            Video
                .getSomeRandomVideos(5, context)
                .then(videos => {
                    this.fetchingEntries = false

                    videos.map(v => {
                        this.playlist.push(v.dataValues)
                    })
                }, error => {
                    console.log(`Failed to add random videos: ${error}`)
                })
        } else {
            let playing = this.playlist.pop()

            console.log(playing.title)
            console.log(this.playlist.length)
        }
    }

    constructor(serverContext) {
        this.fetchingEntries    = false
        this.context            = serverContext
        this.members            = []
        this.playlist           = []
        this.playing            = null

        setInterval(() => this.heartbeat(serverContext), 1000)
    }
}

export default Room
