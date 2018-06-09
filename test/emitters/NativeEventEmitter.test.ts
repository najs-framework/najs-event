import 'jest'
import * as Sinon from 'sinon'
import { NativeEventEmitter } from '../../lib/emitters/NativeEventEmitter'
import { EventEmitter } from 'events'

describe('NativeEventEmitter', function() {
  it('implements Najs.Contracts.Autoload with class name "NajsEvent.NativeEventEmitter"', function() {
    const aee = new NativeEventEmitter()
    expect(aee.getClassName()).toEqual('NajsEvent.NativeEventEmitter')
  })

  describe('constructor()', function() {
    it('create new instance of Emittery class', function() {
      const aee = new NativeEventEmitter()
      expect(aee['eventEmitter']).toBeInstanceOf(EventEmitter)
    })
  })

  describe('.on()', function() {
    it('simply forwards to .eventEmitter.on() and returns this', function() {
      const aee = new NativeEventEmitter()
      const stub = Sinon.stub(aee['eventEmitter'], 'on')
      stub.returns('anything')

      const listener = () => {}
      expect(aee.on('test', listener) === aee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.off()', function() {
    it('simply forwards to .eventEmitter.removeListener() and returns this', function() {
      const aee = new NativeEventEmitter()
      const stub = Sinon.stub(aee['eventEmitter'], 'removeListener')
      stub.returns('anything')

      const listener = () => {}
      expect(aee.off('test', listener) === aee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.once()', function() {
    it('simply forwards to .eventEmitter.once() and returns this', function() {
      const aee = new NativeEventEmitter()
      const stub = Sinon.stub(aee['eventEmitter'], 'once')
      stub.returns('anything')

      const listener = () => {}
      expect(aee.once('test', listener) === aee).toBe(true)
      expect(stub.calledWith('test', listener)).toBe(true)
    })
  })

  describe('.emit()', function() {
    it('forwards and returns to .eventEmitter.emit() by default', async function() {
      const aee = new NativeEventEmitter()
      const stub = Sinon.stub(aee['eventEmitter'], 'emit')
      stub.returns('anything')

      expect(aee.emit('test', ['a', 'b'])).toEqual('anything')
      expect(stub.calledWith('test', ['a', 'b'])).toBe(true)
    })
  })
})
