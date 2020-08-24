import WebSocket from 'ws'
import PubSub from 'pubsub-js'

const TOPIC = 'tweet'

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
  console.log('connection')

  const token = PubSub.subscribe(TOPIC, (msg: string, data: any) => {
    ws.send(data)
  })

  ws.on('message', (msg) => {
    PubSub.publishSync(TOPIC, msg)
  })

  ws.on('close', (code, reason) => {
    PubSub.unsubscribe(token)
  })
})
