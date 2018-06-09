/// <reference path="../contracts/AsyncEventEmitter.d.ts" />
import * as Emittery from 'emittery';
export declare class AsyncEventEmitter implements Najs.Contracts.Autoload, Najs.Contracts.Event.AsyncEventEmitter {
    protected emittery: Emittery;
    constructor();
    getClassName(): string;
    on(eventName: string, listener: Function): this;
    off(eventName: string, listener: Function): this;
    once(eventName: string, listener: Function): this;
    emit(eventName: string, eventData?: any, serial?: boolean): Promise<void>;
}
