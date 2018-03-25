const { Resolver } = require('./resolver')

const mockDB = handlers => ({
  confirmAccount: jest.fn(),
  login: jest.fn(),
  register: jest.fn().mockReturnThis(),
  ...handlers
})

describe('resolver', () => {
  const db = mockDB()
  const resolver = Resolver(db)

  describe('confirmAccount()', () => {
    it('should call db layer register with confirmationCode arg', async () => {
      const confirmationCode = 'TEST_CONFIRMATION_CODE'
      const result = await resolver.confirmAccount({confirmationCode})
      expect(db.confirmAccount).toBeCalledWith(confirmationCode)
    })
  })

  describe('createOpportunity()', () => {
    const createOpportunityInput = {}
    const context = {}    
    it('should throw if user not authenticated', async () => {
      await expect(resolver.createOpportunity({ createOpportunityInput }, context)).rejects.toBeInstanceOf(Error)
    })
  })

  describe('login()', () => {
    it('should call db layer login with credential', async () => {
      const credential = { email: 'kvm@ltd.co', password: 'hash' }
      const result = await resolver.login({credential})
      expect(db.login).toBeCalledWith(credential)
    })
  })

  describe('register()', () => {
    it('should call db layer register with Credential arg', async () => {
      const credential = { email: 'kunal.v.mandalia@gmail.com', password: 'demo' }
      const result = await resolver.register({credential})
      expect(db.register).toBeCalledWith(credential)
    })
  })
  
})
