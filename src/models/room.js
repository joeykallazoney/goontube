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
            type: p.ROOM_PLAYLIST_UPDATE,
            data: {
                room: 'defaultRoom',
                items: this.playlist.map(item => {
                    return {...item}
                })
            }
        }
    }

    broadcastRoomPlaylist() {
        let playlist = this.makePlaylistUpdatePacket()

        this.members.map(client => client.sendPacket(playlist.type, playlist.data))
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

    static loadAll(context) {
        return new Promise((res, rej) => {
            context.data
                .Video
                .findAll()
                .then(rooms => {
                    res(rooms)
                })
        }, (err) => {
            console.log(`Failed to populate from database: ${err.toString()}`)
            rej(err)
        })
    }

    startNextVideo() {
        let nextVideo = this.playlist.shift()

        this.playing = {
            timeSpentPlaying:       0,
            currentStreamSources:   [
                {
                    playUntilCompletion:    true,
                    data:                   nextVideo
                }
            ]
        }

        console.log(`Now playing: ${this.playing.currentStreamSources[0].data.title}`)
        this.broadcastRoomPlaylist()
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
            try {
                if(null === this.playing) {
                    this.startNextVideo()
                } else {
                    if(true === this.playing.active) {
                        this.playing.timeSpentPlaying += 1000
                    } else {
                    }
                }
            } catch(err) {
                console.log(`Failed to advance playlist: ${err.toString()}`)
            }
        }
    }

    constructor(serverContext) {
        this.name               = ``
        this.fetchingEntries    = false
        this.context            = serverContext
        this.members            = []
        this.playlist           = []
        this.playing            = null

        /*this.playing = {
            active:             false,
            mediaStreams:       [],
            timeSpentPlaying:   0
        }*/

        setInterval(() => this.heartbeat(serverContext), 1000)
    }
}

export default Room
