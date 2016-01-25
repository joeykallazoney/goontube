/**
 * @file Starts the various server loops required to host goontube.
 * @since 1.0.0
 */
import http from 'http'
import koa from 'koa'
import koaLogger from 'koa-logger'
import koaStatic from 'koa-static'
import React from 'react'
import Sequelize from 'sequelize'
import uuid from 'node-uuid'
import { Server as WebSocketServer } from 'ws'
import { createStore } from 'redux'
import { renderToString as render } from 'react-dom/server'

import { makePacket } from './util'
import rootReducer from './reducers'
import hash from './hash'
import commandParser from './parser'
import p from './protocol'
import protocolHandlers from './handlers'
import config from '../config'

import Client from './models/client'
import User from './models/user'
import Video from './models/video'

const MAX_CONCURRENT_CONNECTIONS = 2
const DEFAULT_SERVER_PORT        = 7070

let server          = http.createServer()
let staticFiles     = new koaStatic(config.staticPath, {})
let app             = koa()
let wss             = new WebSocketServer({ server: server })
let clients         = []
let sequelize       = new Sequelize(config.databasePath)

let schemas         = {
    User:   User.createSchema(sequelize),
    Video:  Video.createSchema(sequelize)
}

app.use(koaLogger())
app.use(staticFiles)

const HTML =
`<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">

        <title>goontu.be: cultural soup kitchen</title>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Humour and video lounge: add your favourite videos from streaming sites to share them in a public playlist synchronized with other users from all over.">
        <meta name="keywords" content="goontube goontu.be hamburgers video lounge chat existential despair">

        <link rel="stylesheet" href="/style.css">
    </head>

    <body>
        <div id="origin"></div>

        <script src="/bundle.js" type="text/javascript"></script>
    </body>
</html>`

wss.on('connection', (ws) => {
    let client = new Client(ws),
        serverContext = {
            data:       schemas,
            parser:     commandParser
        }

    if(clients
        .filter((c) => c.address.address === client.address.address)
        .length > MAX_CONCURRENT_CONNECTIONS) {
        wss.close(ws)
        return
    }

    clients.push(client)

    ws.on('close', () => {
        let index

        if(-1 !== (index = clients.indexOf(client))) {
            client.teardown()
            clients.splice(index, 1)
            return
        }
    })

    ws.on('message', (message) => {
        try {
            let decoded = JSON.parse(message)

            try {
                if(false === protocolHandlers[decoded.type](serverContext, ws, decoded.data)) {
                    console.log('Handler returned bad data.')
                    return // don't drop client for mere unhandled packets
                }
            } catch(e) {
                console.log('Failed to handle bad client message.')
                throw e
            }
        } catch(e) {
            console.log('Received malformed JSON or other bad data from client.')
            ws.close()
        }
    })

    /*
     * send greeting+acknowledgement to user
     */
    ws.send(makePacket(p.ROOM_USER_MESSAGE,
        {
            id:     uuid.v4(),
            from:   'Tester',
            body:   'This is a test hello message from the server.'
        }
    ))
})

app.use(function *(next) {
    this.status = 200
    this.body   = HTML
})

server.on('request', app.callback())
server.listen(DEFAULT_SERVER_PORT, () => console.log(`Goontube listening on port ${DEFAULT_SERVER_PORT}.`))
