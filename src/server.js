/**
 * @file Starts the various server loops required to host goontube.
 * @since 1.0.0
 */
import http from 'http'
import koa from 'koa'
import koaStatic from 'koa-static'
import React from 'react'
import { Server as WebSocketServer } from 'ws'
import { createStore } from 'redux'
import { renderToString as render } from 'react-dom/server'

import Client from './models/client'
import rootReducer from './reducers'
import hash from './hash'
import p from './protocol'

let server          = http.createServer()
let staticFiles     = new koaStatic(__dirname + '/../static', {})
let app             = koa()
let wss             = new WebSocketServer({ server: server })
let clients         = []
let serverStore     = createStore(rootReducer)

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
    if(clients.filter((c) => c.ip === this.ip).length > 2) {

    }

    let client = new Client(ws)
    clients.push(client)

    ws.on('close', () => {
    })

    ws.on('message', (message) => {
        let decoded = JSON.parse(message.data)
    })
})

app.use(function *(next) {
    this.status = 200
    this.body   = HTML
})

server.on('request', app.callback())
server.listen(7070, () => console.log('Goontube listening on port 7070.'))
