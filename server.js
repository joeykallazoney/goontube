/**
 * @file Starts the various server loops required to handle goontube's server.
 * @since 1.0.0
 */
import http from 'http'
import koa from 'koa'
import koaStatic from 'koa-static'
import React from 'react'
import { Server as WebSocketServer } from 'ws'
import { createStore } from 'redux'
import { renderToString as render } from 'react-dom/server'

import Goontube from './components/app'

let server      = http.createServer()
let staticFiles = new koaStatic(__dirname + '/static', {})
let app         = koa()
let wss         = new WebSocketServer({ server: server })

app.use(staticFiles)

let bundledHTML = (rendered) =>
`<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">

        <title>goontu.be: cultural soup kitchen</title>

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Humour and video lounge: add your favourite videos from streaming sites to share them in a public playlist synchronized with other users from all over.">
        <meta name="keywords" content="goontube goontu.be synchtube hamburgers video lounge chat existential despair">
    </head>

    <body>
        <div id="origin">${rendered}</div>

        <script src="/bundle.js" type="text/javascript"></script>
    </body>
</html>`

wss.on('connection', (ws) => {
    console.log('New WebSocket connection.')
})

app.use(function *(next) {
    let bundle  = bundledHTML(render(<Goontube />))

    this.status = 200
    this.body   = bundle
})

server.on('request', app.callback())
server.listen(8080, () => console.log('Goontube listening on port 8080.'))
