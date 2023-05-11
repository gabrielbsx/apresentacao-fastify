import Fastify from 'fastify'

const docs = [
  {
    uri: '/siteoficial',
    link: 'https://www.fastify.io/docs/latest/Guides/Getting-Started/'
  },
  {
    uri: '/tutorial1',
    link: 'https://www.freecodecamp.org/news/how-to-get-up-and-running-with-fastify-8b7e23781844'
  },
  {
    uri: '/tutorial2',
    link: 'https://medium.com/@IsraelEriston/fastify-n%C3%A3o-%C3%A9-mais-um-framework-para-node-js-783c3990cd55'
  },
  {
    uri: '/comunidade',
    link: 'https://github.com/israeleriston/awesome-fastify'
  }
] as const

const fastify = Fastify({
  logger: true
})

docs.forEach((doc) => {
  fastify.get(doc.uri, function (_request, reply) {
    void reply.redirect(doc.link)
  })
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err != null) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})
