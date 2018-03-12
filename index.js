require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const { resolver } = require('./data/resolver')
const { schema } = require('./data/schema')
const { hostname } = require("os");

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

app.use('/api/graphiql', graphqlHTTP(req => {
  return {
    schema,
    rootValue: resolver,
    graphiql: true,
    context: req.context || null, // Set context in resolver e.g. after logging in
}}))

app.listen(PORT)
console.log(`Running GraphQL API server at ${hostname}:${PORT}/api/graphiql`)