/// <reference types="node" />
/// <reference types="najs-binding" />
/// <reference path="../contracts/EventEmitter.ts" />

import { EventEmitter } from 'events'
import { register } from 'najs-binding'
import { NajsEvent } from '../constants'

export class NativeEventEmitter implements Najs.Contracts.Autoload, Najs.Contracts.Event.EventEmitter {
  protected eventEmitter: NodeJS.EventEmitter

  constructor() {
    this.eventEmitter = new EventEmitter()
  }

  getClassName() {
    return NajsEvent.NativeEventEmitter
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
register(NativeEventEmitter, NajsEvent.NativeEventEmitter)
