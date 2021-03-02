import * as express from 'express'
class Router {

  constructor(app: express.Express) {
      const router = express.Router()

      router.get('/', (req: express.Request, res: express.Response) => {
          res.json({
              message: `example router  message`
          })
      })

      app.use('/', router)
  }
}

export default Router;