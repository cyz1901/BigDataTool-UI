const WebSocket = require('ws')

var ws = null

ws.on('open', function open () {
  console.log('connected')
  ws.send(Date.now())
})

ws.on('close', function close () {
  console.log('disconnected')
})

ws.on('message', function incoming (data) {
  console.log(`Roundtrip time: ${Date.now() - data} ms`)

  setTimeout(function timeout () {
    ws.send(Date.now())
  }, 500)
})

function wsInit (url) {
  if (ws === null) {
    ws = new WebSocket(url)
  }
}

function wsstart (url) {
  wsInit(url)
  ws.send(js)
}
