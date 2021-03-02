import express from 'express'
import Router from '../routes'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'

class App {
  private app: any
  constructor() {
    this.app = express()

    // set logger
    this.app.use(morgan('combined'))

    // set security HTTP headers
    this.app.use(helmet())
     
    // parse json request body
    this.app.use(express.json())

    // parse urlencoded request body
    this.app.use(express.urlencoded({ extended: true }))

    // gzip compression
    this.app.use(compression());
    
    // enable cors
    this.app.use(cors());
    this.app.options('*', cors());

    // set routes
    new Router(this.app);
    
  }

  public Start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app.listen(
        port,
        () => {
          resolve(port)
        })
        .on('error', (err: object) => reject(err));
    })
  }

}

export default App;


