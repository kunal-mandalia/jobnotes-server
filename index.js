const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const { resolver } = require('./data/resolver')
const { schema } = require('./data/schema')


const PORT = 3000 // TODO: use dotenv
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * Allow CORS
 */
app.use('/api', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

app.use('/api/graphql', graphqlHTTP(req => {
  return {
  schema: schema,
  rootValue: resolver,
  graphiql: true,
  context: req.context || null, // Set context in resolver e.g. after logging in
}}))

app.listen(PORT)
console.log(`Running protected GraphQL API server at <domain>:${PORT}/private/graphql`)