import fastify, {
  type FastifyReply,
  type FastifyRequest,
  type HookHandlerDoneFunction
} from 'fastify'
import { exit } from 'node:process'

const someRequestHook = (_request: FastifyRequest, _reply: FastifyReply, done: HookHandlerDoneFunction): void => {
  console.log('Executando o hook antes do handler')
  done()
}

const someResponseHook = (_request: FastifyRequest, _reply: FastifyReply, done: HookHandlerDoneFunction): void => {
  console.log('Executando o hook depois do handler')
  done()
}

const somePreHandlerHook = (_request: FastifyRequest, _reply: FastifyReply, done: HookHandlerDoneFunction): void => {
  console.log('Executando o hook antes do preHandler')
  done()
}

const somePreValidationHook = (_request: FastifyRequest, _reply: FastifyReply, done: HookHandlerDoneFunction): void => {
  console.log('Executando o hook antes do preValidation')
  done()
}

const server = fastify({
  logger: true
})

server.addHook('onRequest', someRequestHook)
server.addHook('onResponse', someResponseHook)
server.addHook('preHandler', somePreHandlerHook)
server.addHook('preValidation', somePreValidationHook)

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
