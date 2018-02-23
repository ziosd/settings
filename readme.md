# gPlatform Production Settings

### Settings - Principles

- Easy to use in Development
- Easy to update in Production

### How can I use this? (./example folder)

```sh
$ yarn add @gplatform/settings
```

```js
// ./settings/index.js
const { load } = require('@gplatform/settings')
const defaults = require('./defaults.json')
const schema = require('./schema.js')

module.exports = load({
  defaults,
  schema, // Joi Schema - Optional
  commandLineInterface: true, // Experimental
  variables: process.env,
  regex: /^MY_APP_PREFIX_/
})
```

```json
// ./settings/defaults.json
{
  "name": "Gary Ascuy Anturiano",
  "server": {
    "host": "localhost",
    "port": "27017"
  },
  "mongo": {
    "uri": "mongodb://localhost:27017/prod"
  }
}
```

```js
// ./settings/schema.js
const joi = require('joi')

module.exports = {
  name: joi.string().min(3).max(30).required(),
  server: {
    host: joi.string().required(),
    port: joi.number().integer().min(0).max(65535)
  },
  mongo: {
    uri: joi.string().required()
  }
}
```

```js
// ./app.js
const express = require('express')
const { get } = require('./settings')
const { log } = console
const app = express()

const name = get('name')
const mongoUri = get('mongo.uri')
const {host, port} = get('server')

app.get('/', (req, res) => res.send(name))
app.listen(port, host, () => {
  log(`Server Created, Ready to listen at ${host}:${port}`)
})
```

### Manual Tests (node example/main.js)

```sh
# Run with defaults | Development 
$ node example/app.js
```

```sh
# Update name in settings | Production
$ MY_APP_PREFIX_name="Production Name" \
    node example/main.js
```

```sh
# Update server.host and server.port in settings | Production
$ MY_APP_PREFIX_server_host="mongodb.gplatform.local" \
    MY_APP_PREFIX_server_port="8000" \
    node example/main.js
```

```sh
# Command Line Interface: Update server.host and server.port in settings with middle score
$ node example/main.js \
    --server-port '8000' \
    --server-port 'mongodb.gplatform.local' 
```

```sh
# Command Line Interface: Update server.host and server.port in settings with dot 
$ node example/main.js \
    --server.port '8000' \
    --server.port 'mongodb.gplatform.local' 
```

### Development 

To update the code you can run tests in watch mode

```sh
$ yarn test -w
```

After complete you can create a build using 

```sh
$ yarn build
```

### Coming soon

- Better docs and examples
- Auto-detect schema from defaults

### License

[MIT](LICENSE)
