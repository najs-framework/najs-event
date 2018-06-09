/// <reference path="../contracts/EventTarget.ts" />
/// <reference path="../contracts/EventEmitter.ts" />
/// <reference path="../contracts/AsyncEventEmitter.ts" />

import { make } from 'najs-binding'
import { NajsEvent } from '../constants'

export const EventEmitterFactory: {
  /**
   * Creates an sync EventEmitter, it will resolve class name "NajsEvent.EventEmitter"
   */
  create(async: false): Najs.Contracts.Event.EventEmitter
  /**
   * Creates an async EventEmitter, it will resolve class name "NajsEvent.AsyncEventEmitter"
   */
  create(async: true): Najs.Contracts.Event.AsyncEventEmitter
  /**
   * Bind EventEmitter functions to a prototype
   *
   * @param {Prototype} prototype prototype want to bind
   * @param {Function} resolver callback that resolves an instance of EventEmitter
   */
  wrap(prototype: any, resolver: (this: any) => any): any
} = {
  create(async: boolean): any {
    return async ? make(NajsEvent.AsyncEventEmitter) : make(NajsEvent.EventEmitter)
  },

  wrap(prototype: any, resolver: (this: any) => any): any {
    const functions = {
      on: true,
      off: true,
      once: true,
      emit: false
    }
    for (const name in functions) {
      prototype[name] = function() {
        const eventEmitter = resolver.call(this)
        const result = eventEmitter[name].call(this, arguments)
        return functions[name] ? this : result
      }
    }
  }
}
