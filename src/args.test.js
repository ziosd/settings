import assert from 'assert'
import { parse } from './args'

describe('args.js', function() {
  describe('#parse()', function() {
    it('should return a a valid object from empty array', function() {
      const object = parse([])
      assert.deepStrictEqual(object, {})
    })

    it('should return a a valid object with simple parameter', function() {
      const object = parse(['--name', 'gary'])
      assert.deepStrictEqual(object, {name: 'gary'})
    })

    it('should return a a valid object with more parameters', function() {
      const object = parse(['--name', 'gary', '--port', '5000', '--host', 'localhost'])
      assert.deepStrictEqual(object, {name: 'gary', port: '5000', host: 'localhost'})
    })

    it('should return a a valid object with nested parameters', function() {
      const base = {mongo: {uri: ''}}
      const object = parse(['--mongo-uri', 'mongo://localhost'], base)
      assert.deepStrictEqual(object, {mongo: {uri: 'mongo://localhost'}})
    })
  })
})
