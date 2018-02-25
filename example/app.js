const express = require('express')
const { get } = require('./settings')
const { log } = console
const app = express()

const name = get('name')
const mongoUri = get('mongo.uri')
const {host, port} = get('service')

app.get('/', (req, res) => res.send(name))
app.listen(port, host, () => {
  log(`Server Created, Ready to listen at ${host}:${port}`)
})
