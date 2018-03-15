const { register } = require('./queries')

describe('queries', () => {
  describe('register()', () => {
    describe('given valid credentails', () => {
      it('should create an SQL string to insert a new user', () => {
        const credential = { email: 'kunal@test.co', password: 'someHash' }
        // todo: test created_on date too
        expect(register(credential)).toContain(
          "insert into users (email, password, created_on) values ('kunal@test.co', 'someHash',"
        )
      })
    })

    describe('given invalid credentials', () => {
      it('should throw', () => {
        const credential = { email: 'bad.email', password: 'someOtherHash' }
        expect(() => { register(credentail) }).toThrow()
      })
    })
  })
})
