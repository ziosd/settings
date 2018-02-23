import assert from 'assert'
import { load } from './index'

describe('index.js', function() {
  describe('#load()', function() {
    it('should return a empty object with empty options', function() {
      const {settings} = load({})
      assert.deepStrictEqual(settings, {})
    })
    it('should return a config object with valid defaults', function() {
      const {settings} = load({defaults: {appName: 'Sales'}})
      assert.deepStrictEqual(settings, {appName: 'Sales'})
    })
    it('should return a config object with valid json string defaults', function() {
      const {settings} = load({defaults: '{"appName": "Sales"}', json: true})
      assert.deepStrictEqual(settings, {appName: 'Sales'})
    })
    it('should return a config object with valid defaults as file', function() {
      const {settings} = load({defaults: '{"appName": "Sales"}', json: true})
      assert.deepStrictEqual(settings, {appName: 'Sales'})
    })
    it('should return a config object with valid json string defaults', function() {
      const {settings} = load({defaults: './assets/settings.json', json: false})
      assert.deepStrictEqual(settings, {appName: 'gPlatform', name: 'Gary'})
    })

    it('should return a config object overwriting default', function() {
      const {settings} = load({defaults: {name: 'a'}, variables: {GPLATFORM_SETTINGS_name: 'b'}})
      assert.deepStrictEqual(settings, {name: 'b'})
    })

    it('should return a config object overwriting default', function() {
      const envVariables = {
        PATH: 'other',
        ANDROID_HOME: 'home',
        GPLATFORM_SETTINGS_name: 'gary',
        GPLATFORM_SETTINGS_db_port: '3666',
        GPLATFORM_SETTINGS_db_host: 'localhost'
      } // process.env
      const options = {
        defaults: {name: 'a'},
        variables: envVariables
      }
      const {settings} = load(options)
      assert.deepStrictEqual(settings, {name: 'gary', db: {port: '3666', host: 'localhost'}})
    })
  })
})
