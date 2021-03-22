import express from 'express'
import session from "express-session";
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import passport from "passport";
import MongoStore from "connect-mongo";
import Router from '../routes'
import { connectDB } from '../config/db/mongo'
import { MONGODB_URI, SESSION_SECRET } from "../utils/secrets";

const app = express()
// set logger
app.use(morgan('combined'))

// set security HTTP headers
app.use(helmet())
 
// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// gzip compression
app.use(compression())

// enable cors
app.use(cors());
app.options('*', cors())

//enable sessions
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: MongoStore.create({
      mongoUrl: MONGODB_URI
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.user = req.user
    next()
});

//Connect to DB
connectDB(MONGODB_URI)
//set routes
new Router(app)

export default app


