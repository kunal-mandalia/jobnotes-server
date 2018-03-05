const { Resolver } = require('./resolver')
const mockDB = {
  register: jest.fn(),
}
const resolver = Resolver(mockDB)

describe('resolver', () => {
  describe('register()', () => {
    const credential = { email: 'kunal.v.mandalia@gmail.com', password: 'demo' }
    const result = resolver.register(credential)
    it('should call db layer register with Credential arg', () => {
      expect(mockDB.register).toBeCalledWith(credential)
    })
  })
})
