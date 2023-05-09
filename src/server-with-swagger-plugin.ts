import { exit } from 'node:process'
import fastify from 'fastify'
import swagger from '@fastify/swagger'

async function main (): Promise<void> {
  const application = fastify({ logger: true })
  await application.register(swagger, {
    swagger: {
      info: {
        title: 'Exemplo de API com Fastify e plugin Swagger',
        description: 'Exemplo de API com Fastify e plugin Swagger',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Saiba mais sobre Swagger'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'user', description: 'Operações relacionadas a usuários' }
      ],
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    },
    prefix: '/docs'
  })

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

  await application.ready()
  application.swagger()

  application.listen({
    port: 3000,
    host: 'localhost'
  }, handlerListening)
}

void main()
