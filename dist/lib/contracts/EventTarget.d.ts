declare namespace Najs.Contracts.Event {
    interface EventTarget {
        /**
         * Adds the listener function to the end of the listeners array for the event named eventName.
         * No checks are made to see if the listener has already been added.
         * Multiple calls passing the same combination of eventName and listener will result in the listener being added,
         * and called, multiple times.
         *
         * @param {string} eventName
         * @param {Function} listener
         */
        on(eventName: string, listener: Function): this;
        /**
         * Removes the specified listener from the listener array for the event named eventName.
         *
         * @param {string} eventName
         * @param {Function} listener
         */
        off(eventName: string, listener: Function): this;
        /**
         * Adds a one-time listener function for the event named eventName.
         * The next time eventName is triggered, this listener is removed and then invoked.
         *
         * @param {string} eventName
         * @param {Function} listener
         */
        once(eventName: string, listener: Function): this;
    }
}
