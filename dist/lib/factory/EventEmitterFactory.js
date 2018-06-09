"use strict";
/// <reference path="../contracts/EventTarget.ts" />
/// <reference path="../contracts/EventEmitter.ts" />
/// <reference path="../contracts/AsyncEventEmitter.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const najs_binding_1 = require("najs-binding");
const constants_1 = require("../constants");
exports.EventEmitterFactory = {
    create(async) {
        return async ? najs_binding_1.make(constants_1.NajsEvent.AsyncEventEmitter) : najs_binding_1.make(constants_1.NajsEvent.EventEmitter);
    },
    wrap(prototype, resolver) {
        const functions = {
            on: true,
            off: true,
            once: true,
            emit: false
        };
        for (const name in functions) {
            prototype[name] = function () {
                const eventEmitter = resolver.call(this);
                const result = eventEmitter[name].call(this, arguments);
                return functions[name] ? this : result;
            };
        }
    }
};
