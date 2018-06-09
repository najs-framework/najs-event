"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
require("../../lib/index");
const Emittery = require("emittery");
describe('Test', function () {
    it('should work', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const ee = new Emittery();
            ee.on('test', function () {
                console.log('1');
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve('one');
                        console.log('one');
                    }, Math.floor(Math.random() * 5000));
                });
            });
            ee.on('test', function () {
                console.log('2');
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve('two');
                        console.log('two');
                    }, Math.floor(Math.random() * 5000));
                });
            });
            ee.on('test', function () {
                console.log('3');
                console.log('three');
            });
            yield ee.emit('test');
            console.log('done');
        });
    });
});
