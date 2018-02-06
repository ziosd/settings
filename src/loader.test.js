import assert from 'assert'
import {
  toObject,
  buildSettings,
  defaultBuildValue,
  processSettings
} from './loader'

describe('loader.js', function() {
  describe('#toObject()', function() {
    it('should return a JSON with valid string', function() {
      const settings = toObject('{"name": "Gary"}', true)
      assert.deepStrictEqual(settings, {name: 'Gary'})
    })

    it('should return a JSON with valid file path', function() {
      const settings = toObject('./assets/settings.json', false)
      assert.deepStrictEqual(settings, {name: 'Gary', appName: 'gPlatform'})
    })
  })

  describe('#buildSettings()', function() {
    it('should return an object from a valid variable', function() {
      const variables = {'name': 'Gary'}
      const settings = buildSettings(variables)
      assert.deepStrictEqual(settings, {name: 'Gary'})
    })

    it('should return an object from a valid list of variables', function() {
      const variables = {
        'name': 'Gary',
        'database_uri': 'mongodb://host/db',
        'database_pool_min': 2,
        'database_pool_max': 100
      }
      const settings = buildSettings(variables)
      assert.deepStrictEqual(settings, {
        name: 'Gary',
        database: {
          uri: 'mongodb://host/db',
          pool: {
            min: 2,
            max: 100
          }
        }
      })
    })

    it('should return an object using default separator', function() {
      const variables = {
        'pool_min': 2,
        'pool_max': 100
      }
      const settings = buildSettings(variables)
      assert.deepStrictEqual(settings, {
        pool: {
          min: 2,
          max: 100
        }
      })
    })

    it('should return an object using custom separator', function() {
      const variables = {
        'pool___min': 2,
        'pool___max': 100
      }
      const settings = buildSettings(variables, '___')
      assert.deepStrictEqual(settings, {
        pool: {
          min: 2,
          max: 100
        }
      })
    })
  })

  describe('#defaultBuildValue()', function() {
    it('should return a object with valid json object', function() {
      const value = defaultBuildValue('{"name": "Gary"}')
      assert.deepStrictEqual(value, {name: 'Gary'})
    })
    it('should return a object with valid json object with spaces in parameter', function() {
      const value = defaultBuildValue('  {"name": "Gary"}  ')
      assert.deepStrictEqual(value, {name: 'Gary'})
    })
    it('should return an array with valid json array', function() {
      const value = defaultBuildValue('[1,2,3,4]')
      assert.deepStrictEqual(value, [1,2,3,4])
    })
    it('should return an array with valid json array with spaces in parameter', function() {
      const value = defaultBuildValue(' [1,2,3,4] ')
      assert.deepStrictEqual(value, [1,2,3,4])
    })
    it('should return a string with valid simple string', function() {
      const value = defaultBuildValue('gary', true)
      assert.deepStrictEqual(value, 'gary')
    })
    it('should return a string with valid simple string with spaces in parameter', function() {
      const value = defaultBuildValue('   gary', true)
      assert.deepStrictEqual(value, '   gary')
    })

  })
  
  describe('#processSettings()', function() {
    it('should return a valid object with default settings', function() {
      const variables = {GPLATFORM_SETTINGS_name: 'Gary'}
      const settings = processSettings(variables)
      assert.deepStrictEqual(settings, {name: 'Gary'})
    })
    it('should return a valid object with default settings excluding useless variables', function() {
      const variables = {
        PATH: '/usr/bin',
        GPLATFORM_SETTINGS_name: 'Gary',
        JAVA_HOME: 'something',
        ANDROID_HOME: 'soemthing',
        GPLATFORM_SETTINGS_database: 'MongoDB',
      }
      const settings = processSettings(variables)
      assert.deepStrictEqual(settings, {name: 'Gary', database: 'MongoDB'})
    })
    it('should return a valid object with default settings with custom regex', function() {
      const variables = {MY_COOL_SYSTEM_name: 'Gary'}
      const settings = processSettings(variables, /^MY_COOL_SYSTEM_/)
      assert.deepStrictEqual(settings, {name: 'Gary'})
    })
    it('should return a valid object with default settings excluding useless variables with custom regex', function() {
      const variables = {
        PATH: '/usr/bin',
        MY_COOL_SYSTEM_name: 'Gary',
        JAVA_HOME: 'something',
        ANDROID_HOME: 'soemthing',
        MY_COOL_SYSTEM_database: 'MongoDB',
      }
      const settings = processSettings(variables, /^MY_COOL_SYSTEM_/)
      assert.deepStrictEqual(settings, {name: 'Gary', database: 'MongoDB'})
    })
  })
})