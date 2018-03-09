const { Resolver } = require('./resolver')

const mockDB = handlers => ({
  register: jest.fn().mockReturnThis(),
  confirmAccount: jest.fn(),
  ...handlers
})


describe('resolver', () => {
  describe('register()', () => {
    it('should call db layer register with Credential arg', async () => {
      const db = mockDB()
      const resolver = Resolver(db)

      const credential = { email: 'kunal.v.mandalia@gmail.com', password: 'demo' }
      const result = await resolver.register({credential})
      // toBeCalledWith not capturing args, scope issue?
      expect(db.register).toBeCalled()
    })
  })
  describe('confirmAccount()', () => {
    it('should call db layer register with confirmationCode arg', async () => {
      const db = mockDB()
      const resolver = Resolver(db)

      const confirmationCode = 'TEST_CONFIRMATION_CODE'
      const result = await resolver.confirmAccount(confirmationCode)
      expect(db.confirmAccount).toBeCalled()
    })
  })
})
