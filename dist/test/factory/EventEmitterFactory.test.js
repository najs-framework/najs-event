"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const NajsBinding = require("najs-binding");
const EventEmitterFactory_1 = require("../../lib/factory/EventEmitterFactory");
const AsyncEventEmitter_1 = require("../../lib/emitters/AsyncEventEmitter");
const NativeEventEmitter_1 = require("./../../lib/emitters/NativeEventEmitter");
describe('EventEmitterFactory', function () {
    describe('.create()', function () {
        it('calls make() with name "NajsEvent.AsyncEventEmitter" if the async param is true"', function () {
            const makeSpy = Sinon.spy(NajsBinding, 'make');
            const aee = EventEmitterFactory_1.EventEmitterFactory.create(true);
            expect(aee).toBeInstanceOf(AsyncEventEmitter_1.AsyncEventEmitter);
            expect(makeSpy.calledWith('NajsEvent.AsyncEventEmitter')).toBe(true);
            makeSpy.restore();
        });
        it('calls make() with name "NajsEvent.EventEmitter" if the async param is true"', function () {
            const makeSpy = Sinon.spy(NajsBinding, 'make');
            const aee = EventEmitterFactory_1.EventEmitterFactory.create(false);
            expect(aee).toBeInstanceOf(NativeEventEmitter_1.NativeEventEmitter);
            expect(makeSpy.calledWith('NajsEvent.EventEmitter')).toBe(true);
            makeSpy.restore();
        });
    });
    describe('.wrap()', function () {
        it('binds EventEmitter function to a prototype', function () {
            class Test {
            }
            EventEmitterFactory_1.EventEmitterFactory.wrap(Test.prototype, function () {
                if (!this['eventEmitter']) {
                    this['eventEmitter'] = EventEmitterFactory_1.EventEmitterFactory.create(false);
                }
                return this['eventEmitter'];
            });
            const test = new Test();
            expect(test['eventEmitter']).toBeUndefined();
            const listener = Sinon.spy(function () { });
            const listenerOnce = Sinon.spy(function () { });
            expect(test.on('event', listener) === test).toBe(true);
            expect(test.once('event', listenerOnce) === test).toBe(true);
            expect(test.emit('event')).toBe(true);
            expect(listener.called).toBe(true);
            expect(listenerOnce.called).toBe(true);
            listener.resetHistory();
            listenerOnce.resetHistory();
            test.emit('event');
            expect(listener.called).toBe(true);
            expect(listenerOnce.called).toBe(false);
            listener.resetHistory();
            listenerOnce.resetHistory();
            test.off('event', listener);
            test.emit('event');
            expect(listener.called).toBe(false);
            expect(listenerOnce.called).toBe(false);
        });
    });
});
