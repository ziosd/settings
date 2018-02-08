const { settings, get } = require('./settings')

console.log("All Settings: ", JSON.stringify(settings, null, 2))
console.log('Name:', get('name'))
console.log('Server.Host:', get('server.host'))
