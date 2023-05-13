import fastify from 'fastify'

const app = fastify()

let counter = 0

app.get('/', (_req, reply) => {
  console.log('Fastify: Request received:', ++counter)
  void reply.send('Hello World!')
})

app.listen({ port: 3000 }, () => {
  console.log('Fastify server listening on port 3000')
})
