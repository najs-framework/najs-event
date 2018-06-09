namespace Najs.Contracts.Event {
  export interface AsyncEventEmitter extends EventTarget {
    /**
     * Triggers an event asynchronously, optionally with some data. Listeners
     * are called in the order they were added, but execute concurrently.
     *
     * Returns a promise for when all the event listeners are done. *Done*
     * meaning executed if synchronous or resolved when an
     * async/promise-returning function. You usually wouldn't want to wait for
     * this, but you could for example catch possible errors. If any of the
     * listeners throw/reject, the returned promise will be rejected with the
     * error, but the other listeners will not be affected.
     *
     * Returns a promise for when all the event listeners are done.
     *
     * @param {string} eventName
     * @param {mixed} eventData
     * @param {boolean} serial if true waits for each listener to resolve before triggering the next one, default is false.
     */
    emit(eventName: string, eventData: any, serial?: boolean): Promise<void>
  }
}
