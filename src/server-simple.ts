import { exit } from 'node:process'
import fastify from 'fastify'

const server = fastify({ logger: true })

const handlerListening = (error: Error | null, address: string): void => {
  if (error != null) {
    server.log.error(error)
    exit(1)
  }
  server.log.info(`Server listening on ${address}`)
}

server.get('/', async (_request, reply) => {
  return await reply.send({ hello: 'world' })
})

server.listen({
  port: 3000,
  host: 'localhost'
}, handlerListening)
