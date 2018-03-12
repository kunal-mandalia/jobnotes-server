const { Pool } = require('pg')
const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOSTADDR,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
}
const pool = new Pool(config)

module.exports = {
  db: pool,
}
