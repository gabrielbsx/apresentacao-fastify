import { exit } from 'node:process'
import fastify from 'fastify'

const application = fastify({ logger: true })

const handlerListening = (error: Error | null, address: string): void => {
  if (error != null) {
    application.log.error(error)
    exit(1)
  }
  application.log.info(`Server listening on ${address}`)
}

application.get('/', async (_request, reply) => {
  return await reply.send({ hello: 'world' })
})

application.listen({
  port: 3000,
  host: 'localhost'
}, handlerListening)
