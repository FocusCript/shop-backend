
import jwt from "jsonwebtoken";
import { catchAsync } from '../utils/catchAsync'

const validateToken = catchAsync(async (req, res, next)=>{
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403)
    req.body.user = user
    next()
  })
})
