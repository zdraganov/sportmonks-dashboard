const hapi = require('hapi')
const inert = require('inert')
const {todayMatches} = require('./service')
const serialize = require('./serialize')

const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/livescore',
    handler: (req, reply) => {
      return todayMatches()
        .then(({ data }) => serialize(data))
        .then(reply)
    }
})

const bootUpServer = async () => {
    await server.register(inert)
    await server.start()

    process.on('unhandledRejection', (err) => {
        console.log(err)
        process.exit(1)
    })
}

bootUpServer()
