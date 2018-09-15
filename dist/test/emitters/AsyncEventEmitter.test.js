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
const Emittery = require("emittery");
const AsyncEventEmitter_1 = require("../../lib/emitters/AsyncEventEmitter");
describe('AsyncEventEmitter', function () {
    it('implements Najs.Contracts.Autoload with class name "NajsEvent.AsyncEventEmitter"', function () {
        const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
        expect(aee.getClassName()).toEqual('NajsEvent.AsyncEventEmitter');
    });
    describe('constructor()', function () {
        it('creates new instance of Emittery class', function () {
            const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
            expect(aee['emittery']).toBeInstanceOf(Emittery);
        });
    });
    describe('.on()', function () {
        it('simply forwards to .emittery.on() and returns this', function () {
            const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
            const stub = Sinon.stub(aee['emittery'], 'on');
            stub.returns('anything');
            const listener = () => { };
            expect(aee.on('test', listener) === aee).toBe(true);
            expect(stub.calledWith('test', listener)).toBe(true);
        });
    });
    describe('.off()', function () {
        it('simply forwards to .emittery.off() and returns this', function () {
            const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
            const stub = Sinon.stub(aee['emittery'], 'off');
            stub.returns('anything');
            const listener = () => { };
            expect(aee.off('test', listener) === aee).toBe(true);
            expect(stub.calledWith('test', listener)).toBe(true);
        });
    });
    describe('.once()', function () {
        it('simply forwards to .emittery.on() with auto unsubscribe and returns this', function () {
            const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
            const stub = Sinon.stub(aee['emittery'], 'on');
            stub.returns('anything');
            const listener = () => { };
            expect(aee.once('test', listener) === aee).toBe(true);
            expect(stub.calledWith('test')).toBe(true);
        });
    });
    describe('.emit()', function () {
        it('forwards to .emittery.emit() by default', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
                const stub = Sinon.stub(aee['emittery'], 'emit');
                stub.returns('anything');
                yield aee.emit('test', ['a', 'b']);
                expect(stub.calledWith('test', ['a', 'b'])).toBe(true);
            });
        });
        it('forwards to .emittery.emit() if serial = false', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
                const stub = Sinon.stub(aee['emittery'], 'emit');
                stub.returns('anything');
                yield aee.emit('test', ['a', 'b'], false);
                expect(stub.calledWith('test', ['a', 'b'])).toBe(true);
            });
        });
        it('forwards to .emittery.emitSerial() if serial = true', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
                const stub = Sinon.stub(aee['emittery'], 'emitSerial');
                stub.returns('anything');
                yield aee.emit('test', ['a', 'b'], true);
                expect(stub.calledWith('test', ['a', 'b'])).toBe(true);
            });
        });
    });
    describe('Integration Tests', function () {
        it('should wait for all listeners resolved before leaving', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const result = [];
                const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
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
                expect(result).toEqual(['b', 'a']);
            });
        });
        it('should work with option serial = true', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const result = [];
                const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
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
                yield aee.emit('event', undefined, true);
                expect(result).toEqual(['a', 'b']);
            });
        });
        it('should work with .once() only 1 time', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const result = [];
                const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
                aee.once('event', function () {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            result.push('a');
                            resolve();
                        }, 100);
                    });
                });
                yield aee.emit('event');
                yield aee.emit('event');
                yield aee.emit('event');
                yield aee.emit('event');
                yield aee.emit('event');
                expect(result).toEqual(['a']);
            });
        });
        it('should work with .once() for all all listeners resolved before leaving', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const result = [];
                const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
                aee.once('event-1', function () {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            result.push('a');
                            resolve();
                        }, 100);
                    });
                });
                aee.once('event-2', function () {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            result.push('b');
                            resolve();
                        }, 50);
                    });
                });
                yield aee.emit('event-1');
                yield aee.emit('event-2');
                expect(result).toEqual(['a', 'b']);
            });
        });
        it('should work with .once() and option serial = true', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const result = [];
                const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
                aee.once('event-1', function () {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            result.push('a');
                            resolve();
                        }, 100);
                    });
                });
                aee.once('event-2', function () {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            result.push('b');
                            resolve();
                        }, 50);
                    });
                });
                yield aee.emit('event-1', undefined, true);
                yield aee.emit('event-2', undefined, true);
                expect(result).toEqual(['a', 'b']);
            });
        });
        it('.on() and .once() should work together perfectly', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const result = [];
                const aee = new AsyncEventEmitter_1.AsyncEventEmitter();
                aee.once('event', function () {
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
                expect(result).toEqual(['b', 'a']);
                yield aee.emit('event');
                expect(result).toEqual(['b', 'a', 'b']);
                yield aee.emit('event');
                expect(result).toEqual(['b', 'a', 'b', 'b']);
                yield aee.emit('event');
                expect(result).toEqual(['b', 'a', 'b', 'b', 'b']);
            });
        });
    });
});
