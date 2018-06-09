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
const AlternativeEventEmitter_1 = require("../../lib/emitters/AlternativeEventEmitter");
describe('AlternativeEventEmitter', function () {
    it('implements Najs.Contracts.Autoload with class name "NajsEvent.AlternativeEventEmitter"', function () {
        const aee = new AlternativeEventEmitter_1.AlternativeEventEmitter();
        expect(aee.getClassName()).toEqual('NajsEvent.AlternativeEventEmitter');
    });
    describe('constructor()', function () {
        it('calls .createEventEmitter() to resolve an instance', function () {
            const createEventEmitterSpy = Sinon.spy(AlternativeEventEmitter_1.AlternativeEventEmitter.prototype, 'createEventEmitter');
            new AlternativeEventEmitter_1.AlternativeEventEmitter();
            expect(createEventEmitterSpy.called).toBe(true);
            createEventEmitterSpy.restore();
        });
    });
    describe('.on()', function () {
        it('simply forwards to .eventEmitter.on() and returns this', function () {
            const aee = new AlternativeEventEmitter_1.AlternativeEventEmitter();
            const stub = Sinon.stub(aee['eventEmitter'], 'on');
            stub.returns('anything');
            const listener = () => { };
            expect(aee.on('test', listener) === aee).toBe(true);
            expect(stub.calledWith('test', listener)).toBe(true);
        });
    });
    describe('.off()', function () {
        it('simply forwards to .eventEmitter.removeListener() and returns this', function () {
            const aee = new AlternativeEventEmitter_1.AlternativeEventEmitter();
            const stub = Sinon.stub(aee['eventEmitter'], 'removeListener');
            stub.returns('anything');
            const listener = () => { };
            expect(aee.off('test', listener) === aee).toBe(true);
            expect(stub.calledWith('test', listener)).toBe(true);
        });
    });
    describe('.once()', function () {
        it('simply forwards to .eventEmitter.once() and returns this', function () {
            const aee = new AlternativeEventEmitter_1.AlternativeEventEmitter();
            const stub = Sinon.stub(aee['eventEmitter'], 'once');
            stub.returns('anything');
            const listener = () => { };
            expect(aee.once('test', listener) === aee).toBe(true);
            expect(stub.calledWith('test', listener)).toBe(true);
        });
    });
    describe('.emit()', function () {
        it('forwards and returns to .eventEmitter.emit() by default', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const aee = new AlternativeEventEmitter_1.AlternativeEventEmitter();
                const stub = Sinon.stub(aee['eventEmitter'], 'emit');
                stub.returns('anything');
                expect(aee.emit('test', ['a', 'b'])).toEqual('anything');
                expect(stub.calledWith('test', ['a', 'b'])).toBe(true);
            });
        });
    });
    describe('Integration Tests', function () {
        it('never wait for all listeners resolved', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const result = [];
                const aee = new AlternativeEventEmitter_1.AlternativeEventEmitter();
                aee.on('event', function () {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            result.push('a');
                            resolve();
                        }, 100);
                    });
                });
                aee.on('event', function () {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            result.push('b');
                            resolve();
                        }, 50);
                    });
                });
                yield aee.emit('event');
                expect(result).toEqual([]);
            });
        });
    });
});
