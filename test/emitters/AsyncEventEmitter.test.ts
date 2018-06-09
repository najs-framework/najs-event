import 'jest'
import * as Sinon from 'sinon'
import * as Emittery from 'emittery'
import { AsyncEventEmitter } from '../../lib/emitters/AsyncEventEmitter'

describe('AsyncEventEmitter', function() {
  it('implements Najs.Contracts.Autoload with class name "NajsEvent.AsyncEventEmitter"', function() {
    const aee = new AsyncEventEmitter()
    expect(aee.getClassName()).toEqual('NajsEvent.AsyncEventEmitter')
  })

  describe('constructor()', function() {
    it('create new instance of Emittery class', function() {
      const aee = new AsyncEventEmitter()
      expect(aee['emittery']).toBeInstanceOf(Emittery)
    })
  })

  describe('.on()', function() {
    it('simply forwards to .emittery.on() and returns this', function() {
      const aee = new AsyncEventEmitter()
      const stub = Sinon.stub(aee['emittery'], 'on')
      stub.returns('anything')

      const listener = () => {}
      expect(aee.on('test', listener) === aee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.off()', function() {
    it('simply forwards to .emittery.off() and returns this', function() {
      const aee = new AsyncEventEmitter()
      const stub = Sinon.stub(aee['emittery'], 'off')
      stub.returns('anything')

      const listener = () => {}
      expect(aee.off('test', listener) === aee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.once()', function() {
    it('simply forwards to .emittery.once() and returns this', function() {
      const aee = new AsyncEventEmitter()
      const stub = Sinon.stub(aee['emittery'], 'once')
      stub.returns('anything')

      const listener = () => {}
      expect(aee.once('test', listener) === aee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.emit()', function() {
    it('forwards and to .emittery.emit() by default', async function() {
      const aee = new AsyncEventEmitter()
      const stub = Sinon.stub(aee['emittery'], 'emit')
      stub.returns('anything')

      await aee.emit('test', ['a', 'b'])
      expect(stub.calledWith('test', ['a', 'b'])).toBe(true)
    })

    it('forwards and to .emittery.emit() if serial = false', async function() {
      const aee = new AsyncEventEmitter()
      const stub = Sinon.stub(aee['emittery'], 'emit')
      stub.returns('anything')

      await aee.emit('test', ['a', 'b'], false)
      expect(stub.calledWith('test', ['a', 'b'])).toBe(true)
    })

    it('forwards and to .emittery.emitSerial() if serial = true', async function() {
      const aee = new AsyncEventEmitter()
      const stub = Sinon.stub(aee['emittery'], 'emitSerial')
      stub.returns('anything')

      await aee.emit('test', ['a', 'b'], true)
      expect(stub.calledWith('test', ['a', 'b'])).toBe(true)
    })
  })

  describe('Integration Tests', function() {
    it('should wait for all listeners resolved before leaving', async function() {
      const result: string[] = []
      const aee = new AsyncEventEmitter()
      aee.on('event', function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            result.push('a')
            resolve()
          }, 100)
        })
      })
      aee.on('event', function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            result.push('b')
            resolve()
          }, 50)
        })
      })

      await aee.emit('event')
      expect(result).toEqual(['b', 'a'])
    })

    it('should work with option serial = true', async function() {
      const result: string[] = []
      const aee = new AsyncEventEmitter()
      aee.on('event', function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            result.push('a')
            resolve()
          }, 100)
        })
      })
      aee.on('event', function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            result.push('b')
            resolve()
          }, 50)
        })
      })

      await aee.emit('event', undefined, true)
      expect(result).toEqual(['a', 'b'])
    })
  })
})
