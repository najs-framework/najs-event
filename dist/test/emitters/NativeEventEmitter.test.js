"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const Sinon = require("sinon");
const NativeEventEmitter_1 = require("../../lib/emitters/NativeEventEmitter");
const events_1 = require("events");
describe('NativeEventEmitter', function () {
    it('implements Najs.Contracts.Autoload with class name "NajsEvent.NativeEventEmitter"', function () {
        const nee = new NativeEventEmitter_1.NativeEventEmitter();
        expect(nee.getClassName()).toEqual('NajsEvent.NativeEventEmitter');
    });
    describe('constructor()', function () {
        it('creates new instance of Emittery class', function () {
            const nee = new NativeEventEmitter_1.NativeEventEmitter();
            expect(nee['eventEmitter']).toBeInstanceOf(events_1.EventEmitter);
        });
    });
    describe('.on()', function () {
        it('simply forwards to .eventEmitter.on() and returns this', function () {
            const nee = new NativeEventEmitter_1.NativeEventEmitter();
            const stub = Sinon.stub(nee['eventEmitter'], 'on');
            stub.returns('anything');
            const listener = () => { };
            expect(nee.on('test', listener) === nee).toBe(true);
            expect(stub.calledWith('test', listener)).toBe(true);
        });
    });
    describe('.off()', function () {
        it('simply forwards to .eventEmitter.removeListener() and returns this', function () {
            const nee = new NativeEventEmitter_1.NativeEventEmitter();
            const stub = Sinon.stub(nee['eventEmitter'], 'removeListener');
            stub.returns('anything');
            const listener = () => { };
            expect(nee.off('test', listener) === nee).toBe(true);
            expect(stub.calledWith('test', listener)).toBe(true);
        });
    });
    describe('.once()', function () {
        it('simply forwards to .eventEmitter.once() and returns this', function () {
            const nee = new NativeEventEmitter_1.NativeEventEmitter();
            const stub = Sinon.stub(nee['eventEmitter'], 'once');
            stub.returns('anything');
            const listener = () => { };
            expect(nee.once('test', listener) === nee).toBe(true);
            expect(stub.calledWith('test', listener)).toBe(true);
        });
    });
    describe('.emit()', function () {
        it('forwards and returns to .eventEmitter.emit() by default', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const nee = new NativeEventEmitter_1.NativeEventEmitter();
                const stub = Sinon.stub(nee['eventEmitter'], 'emit');
                stub.returns('anything');
                expect(nee.emit('test', ['a', 'b'])).toEqual('anything');
                expect(stub.calledWith('test', ['a', 'b'])).toBe(true);
            });
        });
    });
    describe('Integration Tests', function () {
        it('never wait for all listeners resolved', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const result = [];
                const nee = new NativeEventEmitter_1.NativeEventEmitter();
                nee.on('event', function () {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            result.push('a');
                            resolve();
                        }, 100);
                    });
                });
                nee.on('event', function () {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            result.push('b');
                            resolve();
                        }, 50);
                    });
                });
                yield nee.emit('event');
                expect(result).toEqual([]);
            });
        });
    });
});
