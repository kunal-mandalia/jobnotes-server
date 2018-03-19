require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const { hostname } = require('os');
const { resolver } = require('./data/resolver')
const { schema } = require('./data/graphql-schema')
const { authenticate } = require('./middleware/authentication')

const PORT = process.env.PORT
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

app.use('/api/graphiql', authenticate)
app.use('/api/graphiql', graphqlHTTP(req => {
  return {
    schema,
    rootValue: resolver,
    graphiql: true,
}}))

app.listen(PORT)
console.log(`Running GraphQL API server at ${hostname}:${PORT}/api/graphiql`)