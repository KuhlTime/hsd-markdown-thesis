import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'

class App {
  express!: express.Application

  constructor() {
    this.initialize()
  }

  initialize() {
    this.express = express()
    this.express.use(cors())
    this.express.use(helmet())
    this.express.use(compression())
    this.express.use(json({ limit: '15mb' }))
    this.express.use(urlencoded({ limit: '15mb', extended: true }))
  }
}

export default new App().express
