/**
 * @file Starts the various server loops required to handle goontube's server.
 * @since 1.0.0
 */
import http from 'http'
import koa from 'koa'
import { Server as WebSocketServer } from 'ws'
import { createStore } from 'redux'

let server  = http.createServer()
let app     = koa()
let wss     = new WebSocketServer({ server: server })

wss.on('connection', (ws) => {
    console.log('New WebSocket connection.')
})

app.use(function *(next) {
    this.status = 200
    this.body = 'Goontube will be here.'
})

server.on('request', app.callback())
server.listen(8080, () => console.log('Goontube listening on port 8080.'))
