const { buildSchema } = require('graphql')

const Schema = (buildSchemaGQL = buildSchema) => buildSchemaGQL(`
  #
  # Types, Enums, Interfaces
  #

  type User {
    id: ID!
    email: String!
    password_hash: String!
    status: AccountStatus
    name: String
    role: Role
  }

  type Profile {
    email: String!
    status: AccountStatus
    name: String
    role: Role
  }

  type Credential {
    username: String!
    password: String!
  }

  type Token {
    jwt: String!
  }

  enum AccountStatus {
    AWAITING_CONFIRMATION
    REGISTERED
    CLOSED
    DISABLED
  }

  enum Role {
    ADMIN
    CONSUMER
  }

  type Opportunity {
    id: ID!
    company: String!
    address: String
    money: Int
    recruiter: Recruiter
    note: Note // @relationship
  }

  type Recruiter {
    id: ID!
    name: String
    telephone: String
  }

  type Note {
    id: ID!
    comments: String! // to be read in markdown
  }

  type Query {
    login(credential: Credential): Token
    getMyProfile: Profile
    getOpportunities: [Opportunity]
  }

  #
  # Mutations
  #
  type Mutation {
    register(credential: Credential!): String! // email address
    confirmAccount(confirmationCode: String!): Bool
    createOpportunity(opportunity: Opportunity!): Opportunity!
    updateOpportunity(opportunity: Opportunity!): Opportunity!
    deleteOpportunity(id: Int!): Int!
  }

  #
  # Subscriptions
  #
  type Subscription {

  }
`)

const schema = Schema()

module.exports = {
  Schema,
  schema
}
