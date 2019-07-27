const express = require('express')
const path = require('path')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Point static path to dist
app.use('/', express.static(path.join(__dirname, '..', 'dist')))
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')))

// API routes
require('./routes')(app)

const port = process.env.PORT || '3000'
app.set('port', port)

app.listen(port, () => console.log(`Server Running on port ${port}`))
