import next from 'next'
import express, { Request, Response } from 'express'
import http from 'http'

import { getFactory } from '../blockchain'

import routes from './routes'

const app = express()

const PORT = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = routes.getRequestHandler(nextApp)

const server = http.createServer(app)

nextApp.prepare().then(() => {
  app.get('/_next/*', (req: Request, res: Response) => handle(req, res))

  // @ts-ignore
  app.get('/api/factory', async (req: Request, res: Response) => {
    const factory = await getFactory()

    return res.json(factory)
  })

  app.get('*', (req: Request, res: Response) => handle(req, res))

  server.listen(PORT, () => {
    console.log(`Ready on port ${PORT}`)
  })
})
