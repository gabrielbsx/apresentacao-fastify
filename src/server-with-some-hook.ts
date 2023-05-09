import fastify, {
  type FastifyReply,
  type FastifyRequest,
  type HookHandlerDoneFunction
} from 'fastify'
import { exit } from 'node:process'

const someHook = (_request: FastifyRequest, _reply: FastifyReply, done: HookHandlerDoneFunction): void => {
  console.log('Executando o hook antes do handler')
  done()
}

const server = fastify({
  logger: true
})

server.addHook('onRequest', someHook)

const handlerListening = (error: Error | null, address: string): void => {
  if (error != null) {
    server.log.error(error)
    exit(1)
  }
  server.log.info(`Server listening on ${address}`)
}

server.get('/', async (_request, reply) => {
  return await reply.send('hook example')
})

server.listen({
  port: 3000,
  host: 'localhost'
}, handlerListening)
