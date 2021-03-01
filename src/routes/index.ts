import * as express from 'express'
import cors from 'cors'

class Router {

  constructor(server: express.Express) {
      const router = express.Router()

      router.get('/', (req: express.Request, res: express.Response) => {
          res.json({
              message: `example router  message`
          })
      })

      router.options('*', cors());

      server.use('/', router)
  }
}

export default Router;