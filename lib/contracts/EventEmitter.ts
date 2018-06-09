/// <reference path="EventTarget.ts" />

namespace Najs.Contracts.Event {
  export interface EventEmitter extends EventTarget {
    /**
     * Synchronously calls each of the listeners registered for the event named eventName, in the order they were
     * registered, passing the supplied arguments to each.
     *
     * Returns true if the event had listeners, false otherwise.
     *
     * @param {string} eventName
     * @param {mixed} eventData
     * @param {boolean} serial if true waits for each listener to resolve before triggering the next one, default is false.
     */
    emit(eventName: string, eventData: any): boolean
  }
}
