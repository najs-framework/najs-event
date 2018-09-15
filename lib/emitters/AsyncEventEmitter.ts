/// <reference types="najs-binding" />
/// <reference path="../contracts/AsyncEventEmitter.ts" />

import * as Emittery from 'emittery'
import { register } from 'najs-binding'
import { NajsEvent } from '../constants'

export class AsyncEventEmitter implements Najs.Contracts.Autoload, Najs.Contracts.Event.AsyncEventEmitter {
  protected emittery: Emittery

  constructor() {
    this.emittery = new Emittery()
  }

  getClassName() {
    return NajsEvent.AsyncEventEmitter
  }

  on(eventName: string, listener: Function): this {
    this.emittery.on(eventName, <any>listener)

    return this
  }

  off(eventName: string, listener: Function): this {
    this.emittery.off(eventName, <any>listener)

    return this
  }

  once(eventName: string, listener: Function): this {
    const unsubscribe = this.emittery.on(eventName, () => {
      unsubscribe()
      return listener.apply(undefined, arguments)
    })

    return this
  }

  emit(eventName: string, eventData?: any, serial: boolean = false): Promise<void> {
    if (serial) {
      return this.emittery.emitSerial(eventName, eventData)
    }

    return this.emittery.emit(eventName, eventData)
  }
}
register(AsyncEventEmitter, NajsEvent.AsyncEventEmitter)
