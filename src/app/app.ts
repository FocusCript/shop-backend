import express from 'express'
import session from "express-session";
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import passport from "passport";
import bluebird from "bluebird";
import mongoose from 'mongoose'
import MongoStore from "connect-mongo";
import Router from '../routes'
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

  // Connect to MongoDB
const mongoOptions = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
mongoose.Promise = bluebird;

mongoose.connect(MONGODB_URI, mongoOptions).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`)
    process.exit()
});

// set routes
new Router(app)

export default app


