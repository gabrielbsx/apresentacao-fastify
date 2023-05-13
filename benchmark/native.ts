import server from 'node:http'

let counter = 0

const app = server.createServer((_req, res) => {
  console.log('Node: Request received:', ++counter)
  res.end('Hello World!')
})

app.listen(3002, () => {
  console.log('Node server listening on port 3002')
})
