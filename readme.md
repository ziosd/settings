# gPlatform Production Settings

### Settings - Principles

- Easy to configure in Development
- Easy to update in Production

### Config (you can find example in ./example/production)

Install module

```
yarn add @gplatform/settings
```

./settings.json

```
const { load } = require('@gplatform/setttings')
const defaults = require('./settings.json')

module.exports = load({defaults, variables: process.env, regex: /^MY_APP_PREFIX_/})
```

./settings.json // in development just update this file & module allow you update for production

```
{
  "name": "Gary Ascuy Anturiano",
  "db": {
    "host": "localhost",
    "port": 27017
  }
}
```

./main.js
```
const settings = require('./settings') // from everywhere

console.log(JSON.stringify(settings, null, 2))
```

### Development 

To update the code you can run tests in watch mode

```
$ yarn test -w
```

After complete you can create a build using 

```
$ yarn build
```

### Manual Tests 

Run ./example/production/main.js - load defaults

```
$ yarn start
```

Run ./example/production/main.js - load defaults and merge with env variable

```
$ MY_APP_PREFIX_name="Value Updated from environment var" yarn start
```

Run ./example/production/main.js - load defaults and merge with env variable (more than one), It is really useful for deploy

```
$ MY_APP_PREFIX_name="Value Updated from environment var" \
    MY_APP_PREFIX_db_host="mongodb.gplatform.local" \
    MY_APP_PREFIX_db_port="8000" \
    yarn start
```

### License

MIT
