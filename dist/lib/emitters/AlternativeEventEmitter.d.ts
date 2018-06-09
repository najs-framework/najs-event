/// <reference path="../contracts/EventEmitter.d.ts" />
export declare class AlternativeEventEmitter implements Najs.Contracts.Autoload, Najs.Contracts.Event.EventEmitter {
    protected eventEmitter: any;
    constructor();
    protected createEventEmitter(): any;
    getClassName(): string;
    on(eventName: string, listener: Function): this;
    off(eventName: string, listener: Function): this;
    once(eventName: string, listener: Function): this;
    emit(eventName: string, eventData?: any): boolean;
}
