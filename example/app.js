const express = require('express')
const { get } = require('./settings')
const app = express()

const name = get('name')
const mongoUri = get('mongo.uri')
const {host, port} = get('server')

app.get('/', (req, res) => res.send(name))
app.listen(port, host, () => {
  log(`Server Created, Ready to listen at ${host}:${port}`)
})
