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

  input CredentialInput {
    email: String!
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
    note: Note
  }

  input OpportunityInput {
    id: ID!
    company: String
    address: String
    money: Int
    recruiter: RecruiterInput
    note: NoteInput
  }

  type Recruiter {
    id: ID!
    name: String
    telephone: String
  }

  input RecruiterInput {
    id: ID!
    name: String
    telephone: String
  }

  type Note {
    id: ID!
    comments: String!
  }

  input NoteInput {
    id: ID!
    comments: String!
  }

  type Query {
    login(credential: CredentialInput): Token
    getMyProfile: Profile
    getOpportunities: [Opportunity]
  }

  #
  # Mutations
  #
  type Mutation {
    register(credential: CredentialInput!): String!
    confirmAccount(confirmationCode: String!): Boolean
    createOpportunity(opportunity: OpportunityInput!): Opportunity!
    updateOpportunity(opportunity: OpportunityInput!): Opportunity!
    deleteOpportunity(id: Int!): Int!
  }

  #
  # Subscriptions
  #
`)

const schema = Schema()

module.exports = {
  Schema,
  schema
}
