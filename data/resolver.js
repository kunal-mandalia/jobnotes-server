const db = require('./database-layer').databaseLayer
const { requireAuth } = require('../util/helper')

const Resolver = databaseLayer => {
  /**
   * Resolver function signature
   * Since resolver is mounted on root the signature
   * will omit parent
   * (args, context, info)
   */
  return {
    confirmAccount: async ({confirmationCode}) => {
      return await databaseLayer.confirmAccount(confirmationCode)
    },
    createOpportunity: async ({opportunityInput}, context) => {
      requireAuth(context)
    },
    getMyProfile: async (_, context) => {
      requireAuth(context)
      return await db.getUserById(user_id)
    },
    login: async ({credential}) => {
      return await databaseLayer.login(credential)
    },
    register: async ({credential}) => {
      return await databaseLayer.register(credential)
    },
  }
}

const resolver = Resolver(db)

module.exports = {
  Resolver,
  resolver
}
