const db = require('./database-layer').databaseLayer

const Resolver = databaseLayer => {
  // register: ({credential: { email, password }},)
  // todo: clarify gql function signature
  return {
    confirmAccount: async ({confirmationCode}) => {
      const result = await databaseLayer.confirmAccount(confirmationCode)
      return result
    },
    getMyProfile: async (_, context) => {
      const user_id = context.headers.authorization
      if (user_id) {
        const result = await db.getUserById(31)
        return result
      }
      throw new Error('You need to login first')
    },
    register: async ({credential}) => {
      const result = await databaseLayer.register(credential)
      return result
    },
  }
}

const resolver = Resolver(db)

module.exports = {
  Resolver,
  resolver
}
