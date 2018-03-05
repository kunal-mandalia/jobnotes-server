const { databaseLayer } = require('./database-layer')
const ORM = {} // require('postgres'), setup
const databaseConnection = databaseLayer(ORM)

module.exports = {
  databaseConnection
}
