# gPlatform Production Settings

### Settings - Principles

- Easy to use in Development
- Easy to update in Production

### YouTube Tutorial

- [https://youtu.be/tGkldcVIG7M](https://youtu.be/tGkldcVIG7M)

### Features

- Node.JS Configuration
- Command line interface to create settings folder
- Command line interface to build .env for docker deploy
- Atomic Object Merging / Partial Updates
- Environment Variables
- Command Line Arguments
- Config Validation

### How can I use this?

```sh
# Recommended app folder structure
- package.json         # NodeJS package
- src                  # Source code
  - app.js             # app entry point
  - settings           # settings module
    - index.js         # module config
    - settings.json    # default values
    - schema.js        # validation schema
```

```sh
# Install gplatform module
$ yarn add @gplatform/settings
```

```sh
# In ./src | Creates ./settings folder
$ npx @gplatform/settings --init MY_APP_PREFIX
```

```sh
# In ./src | Create .env file for production docker
$ npx @gplatform/settings --env > production.env
```

### Usage | Variants

```sh
# Run with defaults
$ node src/app.js
```

```sh
# Run with defaults updating service.port
$ node src/app.js --service-port 9000
```

```sh
# Run with defaults updating service
$ node src/app.js --service-port 9000 --service-host 10.0.0.10
```

```sh
# Run with defaults updating service.host
$ MY_APP_PREFIX_service_host="prod.mywebsite.com" \
    node src/app.js
```

```sh
# Run without defaults updating all from env variable
$ MY_APP_PREFIX='{"service":{"host":"local","port":"27017"}' \
    node src/app.js
```

### Manual - How can I use this?

```sh
$ yarn add @gplatform/settings
```

```js
// add ./settings/index.js
const { load } = require('@gplatform/settings')
const defaults = require('./settings.json')
const schema = require('./schema.js')
const appName = 'MY_APP_PREFIX'

module.exports = load({
  defaults,
  schema, // Joi Schema - Optional
  commandLineInterface: true, // Experimental
  app: process.env[appName],
  variables: process.env,
  regex: new RegExp('^' + appName + '_')
})
```

```json
// add ./settings/settings.json
{
  "name": "Gary Ascuy Anturiano",
  "service": {
    "host": "localhost",
    "port": "27017"
  },
  "mongo": {
    "uri": "mongodb://localhost:27017/prod"
  }
}
```

```js
// add ./settings/schema.js
const joi = require('joi')

module.exports = {
  name: joi.string().min(3).max(30).required(),
  service: {
    host: joi.string().required(),
    port: joi.number().integer().min(0).max(65535)
  },
  mongo: {
    uri: joi.string().required()
  }
}
```

```js
// add ./app.js
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
```

```sh
# Run application at port 8000
$ node app.js --service-port 8000
```

### Development - Contribution

To update the code you can run tests in watch mode

```sh
$ yarn test -w
```

After complete you can create a build using 

```sh
$ yarn build
```

### Example

- In repo at example/main.js you can find a example

```sh
$ git clone https://github.com/ziosd/settings.git
$ cd settings
```

```sh
# Basic execution
$ yarn start
```

```sh
# Basic execution
$ yarn start
```

```sh
# Using args as cli
$ yarn start --service-port 5600 --service-host localhost
```

```sh
# Using env variables
$ MY_APP_PREFIX_service_port=8000 \
    MY_APP_PREFIX_service_port=gplatform.me \
    yarn start
```

### Coming soon

- Docker config generation
- More examples
- Better video tutorial

### License

[MIT](LICENSE)
