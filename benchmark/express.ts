import express from 'express'

const app = express()

let counter = 0

app.get('/', (_req, res) => {
  console.log('Express: Request received:', ++counter)
  res.send('Hello World!')
})

app.listen(3001, () => {
  console.log('Express server listening on port 3001')
})
