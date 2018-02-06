# gPlatform Production Settings

### Settings - Principles

- Easy to configure in Development
- Easy to update in Production

### Config (you can find example in ./example/production)

Install module

```sh
$ yarn add @gplatform/settings
```

./settings.js

```js
const { load } = require('@gplatform/settings')
const defaults = require('./settings.json')

module.exports = load({defaults, variables: process.env, regex: /^MY_APP_PREFIX_/})
```

./settings.json // in development just update this file & module allow you update for production

```json
{
  "name": "Gary Ascuy Anturiano",
  "db": {
    "host": "localhost",
    "port": 27017
  }
}
```

./main.js
```js
const settings = require('./settings') // from everywhere

console.log(JSON.stringify(settings, null, 2))
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

### Manual Tests 

Run ./example/production/main.js - load defaults

```sh
$ yarn start
```

Run ./example/production/main.js - load defaults and merge with env variable

```sh
$ MY_APP_PREFIX_name="Value Updated from environment var" yarn start
```

Run ./example/production/main.js - load defaults and merge with env variable (more than one), It is really useful for deploy

```sh
$ MY_APP_PREFIX_name="Value Updated from environment var" \
    MY_APP_PREFIX_db_host="mongodb.gplatform.local" \
    MY_APP_PREFIX_db_port="8000" \
    yarn start
```

### License

MIT
[MIT](LICENSE)
