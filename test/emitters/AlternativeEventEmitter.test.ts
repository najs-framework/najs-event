import 'jest'
import * as Sinon from 'sinon'
import { AlternativeEventEmitter } from '../../lib/emitters/AlternativeEventEmitter'

describe('AlternativeEventEmitter', function() {
  it('implements Najs.Contracts.Autoload with class name "NajsEvent.AlternativeEventEmitter"', function() {
    const aee = new AlternativeEventEmitter()
    expect(aee.getClassName()).toEqual('NajsEvent.AlternativeEventEmitter')
  })

  describe('constructor()', function() {
    it('calls .createEventEmitter() to resolve an instance', function() {
      const createEventEmitterSpy = Sinon.spy(AlternativeEventEmitter.prototype, <any>'createEventEmitter')
      new AlternativeEventEmitter()
      expect(createEventEmitterSpy.called).toBe(true)
      createEventEmitterSpy.restore()
    })
  })

  describe('.on()', function() {
    it('simply forwards to .eventEmitter.on() and returns this', function() {
      const aee = new AlternativeEventEmitter()
      const stub = Sinon.stub(aee['eventEmitter'], 'on')
      stub.returns('anything')

      const listener = () => {}
      expect(aee.on('test', listener) === aee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.off()', function() {
    it('simply forwards to .eventEmitter.removeListener() and returns this', function() {
      const aee = new AlternativeEventEmitter()
      const stub = Sinon.stub(aee['eventEmitter'], 'removeListener')
      stub.returns('anything')

      const listener = () => {}
      expect(aee.off('test', listener) === aee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.once()', function() {
    it('simply forwards to .eventEmitter.once() and returns this', function() {
      const aee = new AlternativeEventEmitter()
      const stub = Sinon.stub(aee['eventEmitter'], 'once')
      stub.returns('anything')

      const listener = () => {}
      expect(aee.once('test', listener) === aee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.emit()', function() {
    it('forwards and returns to .eventEmitter.emit() by default', async function() {
      const aee = new AlternativeEventEmitter()
      const stub = Sinon.stub(aee['eventEmitter'], 'emit')
      stub.returns('anything')

      expect(aee.emit('test', ['a', 'b'])).toEqual('anything')
      expect(stub.calledWith('test', ['a', 'b'])).toBe(true)
    })
  })

  describe('Integration Tests', function() {
    it('never wait for all listeners resolved', async function() {
      const result: string[] = []
      const aee = new AlternativeEventEmitter()
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
      expect(result).toEqual([])
    })
  })
})
