require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const helmet = require('helmet')

const IN_PROD = process.env.NODE_ENV === 'production'
const port = process.env.PORT || '3000'
console.log('Running in prod:', IN_PROD)

// Use native promises
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).then(() => {
  console.log('Connected to database')
}, err => {
  console.log('err', err)
})

// Setup express
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, '..', 'dist')))
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')))
if (IN_PROD) {
  app.use(helmet())
}

// Configure session & passport
app.use(
  session({
    secret: process.env.APP_SECRET || '123',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: IN_PROD
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())

// API routes
app.get('/api', (req, res) => res.json({ status: 'up' })) // sanity check
require('./routes')(app)

app.set('port', port)

app.use(function (err, req, res, next) {
  if (!IN_PROD) console.log(err.message)
  res.status(500).send(err.message)
})

app.listen(port, () => console.log(`Server Running on port ${port}`))
