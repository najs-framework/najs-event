"use strict";
/// <reference types="node" />
/// <reference types="najs-binding" />
/// <reference path="../contracts/EventEmitter.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
class NativeEventEmitter {
    constructor() {
        this.eventEmitter = new events_1.EventEmitter();
    }
    getClassName() {
        return constants_1.NajsEvent.NativeEventEmitter;
    }
    on(eventName, listener) {
        this.eventEmitter.on(eventName, listener);
        return this;
    }
    off(eventName, listener) {
        this.eventEmitter.removeListener(eventName, listener);
        return this;
    }
    once(eventName, listener) {
        this.eventEmitter.once(eventName, listener);
        return this;
    }
    emit(eventName, eventData) {
        return this.eventEmitter.emit(eventName, eventData);
    }
}
exports.NativeEventEmitter = NativeEventEmitter;
najs_binding_1.register(NativeEventEmitter, constants_1.NajsEvent.NativeEventEmitter);
