const helper = require('./helper')

describe('helper functions', () => {
  describe('validateCredential()', () => {
    it('should throw when credential malformed', () => {
      const badCredential = { email: 'in@valid', password: null }
      expect(() => { helper.validateCredential() }).toThrow()
      expect(() => { helper.validateCredential(badCredential) }).toThrow()
    })

    it('should not throw when credential passes validation', () => {
      const credential = { email: 'kunal@ltd.co', password: 'somethingStrong' }
      expect(() => { helper.validateCredential(credential) }).not.toThrow()
    })
  })
})
