/// <reference types="node" />
/// <reference types="najs-binding" />
/// <reference path="../contracts/EventEmitter.ts" />

import { register } from 'najs-binding'
import { NajsEvent } from '../constants'
const EventEmitter = require('wolfy87-eventemitter')

export class AlternativeEventEmitter implements Najs.Contracts.Autoload, Najs.Contracts.Event.EventEmitter {
  protected eventEmitter: any

  constructor() {
    this.eventEmitter = this.createEventEmitter()
  }

  protected createEventEmitter() {
    return new EventEmitter()
  }

  getClassName() {
    return NajsEvent.AlternativeEventEmitter
  }

  on(eventName: string, listener: Function): this {
    this.eventEmitter.on(eventName, <any>listener)

    return this
  }

  off(eventName: string, listener: Function): this {
    this.eventEmitter.removeListener(eventName, <any>listener)

    return this
  }

  once(eventName: string, listener: Function): this {
    this.eventEmitter.once(eventName, <any>listener)

    return this
  }

  emit(eventName: string, eventData?: any): boolean {
    return this.eventEmitter.emit(eventName, eventData)
  }
}
register(AlternativeEventEmitter, NajsEvent.AlternativeEventEmitter)
