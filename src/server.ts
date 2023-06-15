import Hapi, { Request } from '@hapi/hapi'
import { Server } from '@hapi/hapi'

const PORT = 4000
const END_POINT = `http://localhost:${PORT}/`

const server: Server = Hapi.server({
  port: PORT,
  host: '0.0.0.0',
})

let counter = 0

server.route({
  method: 'GET',
  async handler(request: Request) {
    counter++
    console.log(`counter => ${counter}`)
    return `🦥 ${counter}`
  },
  path: '/',
})

server.start().then(() => {
  console.log(`Server is running on ${END_POINT} 🚀`)
})

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection')
  console.error(err)
  process.exit(1)
})
