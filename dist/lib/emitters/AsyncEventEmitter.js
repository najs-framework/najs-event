"use strict";
/// <reference types="najs-binding" />
/// <reference path="../contracts/AsyncEventEmitter.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const Emittery = require("emittery");
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
class AsyncEventEmitter {
    constructor() {
        this.emittery = new Emittery();
    }
    getClassName() {
        return constants_1.NajsEvent.AsyncEventEmitter;
    }
    on(eventName, listener) {
        this.emittery.on(eventName, listener);
        return this;
    }
    off(eventName, listener) {
        this.emittery.off(eventName, listener);
        return this;
    }
    once(eventName, listener) {
        const unsubscribe = this.emittery.on(eventName, () => {
            unsubscribe();
            return listener.apply(undefined, arguments);
        });
        return this;
    }
    emit(eventName, eventData, serial = false) {
        if (serial) {
            return this.emittery.emitSerial(eventName, eventData);
        }
        return this.emittery.emit(eventName, eventData);
    }
}
exports.AsyncEventEmitter = AsyncEventEmitter;
najs_binding_1.register(AsyncEventEmitter, constants_1.NajsEvent.AsyncEventEmitter);
