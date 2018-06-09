"use strict";
/// <reference types="node" />
/// <reference types="najs-binding" />
/// <reference path="../contracts/EventEmitter.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
const EventEmitter = require('wolfy87-eventemitter');
class AlternativeEventEmitter {
    constructor() {
        this.eventEmitter = this.createEventEmitter();
    }
    createEventEmitter() {
        return new EventEmitter();
    }
    getClassName() {
        return constants_1.NajsEvent.AlternativeEventEmitter;
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
exports.AlternativeEventEmitter = AlternativeEventEmitter;
najs_binding_1.register(AlternativeEventEmitter, constants_1.NajsEvent.AlternativeEventEmitter);
