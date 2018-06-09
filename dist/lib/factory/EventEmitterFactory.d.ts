/// <reference path="../contracts/EventTarget.d.ts" />
/// <reference path="../contracts/EventEmitter.d.ts" />
/// <reference path="../contracts/AsyncEventEmitter.d.ts" />
import '../emitters/AsyncEventEmitter';
import '../emitters/NativeEventEmitter';
export declare const EventEmitterFactory: {
    /**
     * Creates an sync EventEmitter, it will resolve class name "NajsEvent.EventEmitter"
     */
    create(async: false): Najs.Contracts.Event.EventEmitter;
    /**
     * Creates an async EventEmitter, it will resolve class name "NajsEvent.AsyncEventEmitter"
     */
    create(async: true): Najs.Contracts.Event.AsyncEventEmitter;
    /**
     * Bind EventEmitter functions to a prototype
     *
     * @param {Prototype} prototype prototype want to bind
     * @param {Function} resolver callback that resolves an instance of EventEmitter
     */
    wrap(prototype: any, resolver: (this: any) => any): any;
};
