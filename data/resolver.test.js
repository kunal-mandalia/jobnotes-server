const { Resolver } = require('./resolver')

const mockDB = {
  register: jest.fn().mockReturnThis()
}
const resolver = Resolver(mockDB)

describe('resolver', () => {
  describe('register()', () => {
    it('should call db layer register with Credential arg', async () => {
      const credential = { email: 'kunal.v.mandalia@gmail.com', password: 'demo' }
      const result = await resolver.register({credential})
      expect(mockDB.register).toBeCalled()
    })
  })
})
