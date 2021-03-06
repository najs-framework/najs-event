import 'jest'
import * as Sinon from 'sinon'
import { NativeEventEmitter } from '../../lib/emitters/NativeEventEmitter'
import { EventEmitter } from 'events'

describe('NativeEventEmitter', function() {
  it('implements Najs.Contracts.Autoload with class name "NajsEvent.NativeEventEmitter"', function() {
    const nee = new NativeEventEmitter()
    expect(nee.getClassName()).toEqual('NajsEvent.NativeEventEmitter')
  })

  describe('constructor()', function() {
    it('creates new instance of Emittery class', function() {
      const nee = new NativeEventEmitter()
      expect(nee['eventEmitter']).toBeInstanceOf(EventEmitter)
    })
  })

  describe('.on()', function() {
    it('simply forwards to .eventEmitter.on() and returns this', function() {
      const nee = new NativeEventEmitter()
      const stub = Sinon.stub(nee['eventEmitter'], 'on')
      stub.returns('anything')

      const listener = () => {}
      expect(nee.on('test', listener) === nee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.off()', function() {
    it('simply forwards to .eventEmitter.removeListener() and returns this', function() {
      const nee = new NativeEventEmitter()
      const stub = Sinon.stub(nee['eventEmitter'], 'removeListener')
      stub.returns('anything')

      const listener = () => {}
      expect(nee.off('test', listener) === nee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.once()', function() {
    it('simply forwards to .eventEmitter.once() and returns this', function() {
      const nee = new NativeEventEmitter()
      const stub = Sinon.stub(nee['eventEmitter'], 'once')
      stub.returns('anything')

      const listener = () => {}
      expect(nee.once('test', listener) === nee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.emit()', function() {
    it('forwards and returns to .eventEmitter.emit() by default', async function() {
      const nee = new NativeEventEmitter()
      const stub = Sinon.stub(nee['eventEmitter'], 'emit')
      stub.returns('anything')

      expect(nee.emit('test', ['a', 'b'])).toEqual('anything')
      expect(stub.calledWith('test', ['a', 'b'])).toBe(true)
    })
  })

  describe('Integration Tests', function() {
    it('never wait for all listeners resolved', async function() {
      const result: string[] = []
      const nee = new NativeEventEmitter()
      nee.on('event', function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            result.push('a')
            resolve()
          }, 100)
        })
      })
      nee.on('event', function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            result.push('b')
            resolve()
          }, 50)
        })
      })

      await nee.emit('event')
      expect(result).toEqual([])
    })
  })
})
