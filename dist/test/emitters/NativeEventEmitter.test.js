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
        const aee = new NativeEventEmitter_1.NativeEventEmitter();
        expect(aee.getClassName()).toEqual('NajsEvent.NativeEventEmitter');
    });
    describe('constructor()', function () {
        it('create new instance of Emittery class', function () {
            const aee = new NativeEventEmitter_1.NativeEventEmitter();
            expect(aee['eventEmitter']).toBeInstanceOf(events_1.EventEmitter);
        });
    });
    describe('.on()', function () {
        it('simply forwards to .eventEmitter.on() and returns this', function () {
            const aee = new NativeEventEmitter_1.NativeEventEmitter();
            const stub = Sinon.stub(aee['eventEmitter'], 'on');
            stub.returns('anything');
            const listener = () => { };
            expect(aee.on('test', listener) === aee).toBe(true);
            expect(stub.calledWith('test', listener)).toBe(true);
        });
    });
    describe('.off()', function () {
        it('simply forwards to .eventEmitter.removeListener() and returns this', function () {
            const aee = new NativeEventEmitter_1.NativeEventEmitter();
            const stub = Sinon.stub(aee['eventEmitter'], 'removeListener');
            stub.returns('anything');
            const listener = () => { };
            expect(aee.off('test', listener) === aee).toBe(true);
            expect(stub.calledWith('test', listener)).toBe(true);
        });
    });
    describe('.once()', function () {
        it('simply forwards to .eventEmitter.once() and returns this', function () {
            const aee = new NativeEventEmitter_1.NativeEventEmitter();
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
                const aee = new NativeEventEmitter_1.NativeEventEmitter();
                const stub = Sinon.stub(aee['eventEmitter'], 'emit');
                stub.returns('anything');
                expect(aee.emit('test', ['a', 'b'])).toEqual('anything');
                expect(stub.calledWith('test', ['a', 'b'])).toBe(true);
            });
        });
    });
});
