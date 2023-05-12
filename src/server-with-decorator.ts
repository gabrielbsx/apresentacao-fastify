import fastify from 'fastify'

interface SomeDecoratorParams {
  message: string
}

async function main (): Promise<void> {
  const server = fastify({
    logger: true
  })

  server.decorate('someDecorator', (someDecoratorParams: SomeDecoratorParams): void => {
    console.log('sua mensagem é:', someDecoratorParams.message)
  })

  server.get('/', async (_request, reply) => {
    server.someDecorator({ message: 'Hello World' })
    return await reply.send('decorator example')
  })

  await server.listen({ port: 3000 })
}

void main()

declare module 'fastify' {
  interface FastifyInstance {
    someDecorator: (someDecoratorParams: SomeDecoratorParams) => void
  }
}
