/// <reference path="../contracts/EventEmitter.d.ts" />
/// <reference types="node" />
export declare class NativeEventEmitter implements Najs.Contracts.Autoload, Najs.Contracts.Event.EventEmitter {
    protected eventEmitter: NodeJS.EventEmitter;
    constructor();
    getClassName(): string;
    on(eventName: string, listener: Function): this;
    off(eventName: string, listener: Function): this;
    once(eventName: string, listener: Function): this;
    emit(eventName: string, eventData?: any): boolean;
}
