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

    initConnection() {
        this.broadcastCurrentMedia()
        this.broadcastRoomPlaylist()
    }

    updateRoomUsersList() {
        let packet = this.makeUserListPacket()

        this.members.map(u => u.sendPacket(packet.type, packet.data))
    }

    makeCurrentMediaPacket() {
        return {
            type: p.ROOM_MEDIA_UPDATE,
            data: {
                active:     true,
                streams:    [], // what is this?
                id:         this.playing.id,
                provider:   'youtube', //change to read from this, change player name entries on this to be coherent to the system
                startTime:  this.playing.startTime
                //position:   this.playing.position
            }
        }
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

    broadcast(type, data) {
        this.members.map(client => client.sendPacket(type, data))
    }

    broadcastCurrentMedia() {
        let playingPacket = this.makeCurrentMediaPacket()

        this.broadcast(playingPacket.type, playingPacket.data)
    }

    broadcastRoomPlaylist() {
        let playlistPacket = this.makePlaylistUpdatePacket()

        this.broadcast(playlistPacket.type, playlistPacket.data)
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

        //console.log(nextVideo)

        this.playing = {
            active:                 true,
            id:                     nextVideo.id,
            title:                  nextVideo.title,
            timeSpentPlaying:       0,
            duration:               nextVideo.duration_ms,
            startTime:              Date.now()
        }
        console.log(this)

        //console.log(`Now playing: ${this.playing.title}`)

        this.broadcastCurrentMedia()
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

                        if(this.playing.timeSpentPlaying > this.playing.duration) {
                            this.startNextVideo()
                        }
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
