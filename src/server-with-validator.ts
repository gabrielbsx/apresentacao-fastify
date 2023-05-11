import fastify, {
  type FastifySchema
} from 'fastify'

const server = fastify({
  logger: true
})

const schema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      age: {
        type: 'number'
      }
    },
    required: ['name', 'age']
  }
} as const

server.post('/user', {
  schema
}, async (request, reply) => {
  const { name, age } = request.body as {
    name: string
    age: number
  }
  return await reply.send({ name, age })
})

server.listen({ port: 3000 }, (err, address) => {
  if (err != null) {
    server.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})
