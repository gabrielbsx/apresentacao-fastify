import fastify, {
  type FastifyInstance,
  type HookHandlerDoneFunction
} from 'fastify'
import { exit } from 'node:process'

async function main (): Promise<void> {
  const server = fastify({
    logger: true
  })

  const somePlugin = (_server: FastifyInstance, options: any, done: HookHandlerDoneFunction): void => {
    console.log('Executando o plugin')
    console.log('Options:', options)
    done()
  }

  const handlerListening = (error: Error | null, address: string): void => {
    if (error != null) {
      server.log.error(error)
      exit(1)
    }
    server.log.info(`Server listening on ${address}`)
  }

  void server.register(somePlugin, {
    some: 'options'
  })

  server.get('/', async (_request, reply) => {
    return await reply.send('hook example')
  })

  server.listen({
    port: 3000,
    host: 'localhost'
  }, handlerListening)
}

void main()
