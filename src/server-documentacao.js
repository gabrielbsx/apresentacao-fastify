const siteOficial = "https://www.fastify.io/docs/latest/Guides/Getting-Started/"
const tutorial1 = "https://www.freecodecamp.org/news/how-to-get-up-and-running-with-fastify-8b7e23781844"
const tutorial2 = "https://medium.com/@IsraelEriston/fastify-n%C3%A3o-%C3%A9-mais-um-framework-para-node-js-783c3990cd55"
const comunidade = "https://github.com/israeleriston/awesome-fastify"

// Require the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
    logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})

fastify.get('/siteoficial', function (request, reply) {
    reply.redirect(siteOficial)
})

fastify.get('/tutorial1', function (request, reply) {
    reply.redirect(tutorial1)
})

fastify.get('/tutorial2', function (request, reply) {
    reply.redirect(tutorial2)
})

fastify.get('/comunidade', function (request, reply) {
    reply.redirect(comunidade)
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})