"use strict";
exports.__esModule = true;
exports.Singleton = void 0;
var Singleton = /** @class */ (function () {
    function Singleton() {
        this.consola = "";
        this.errores = [];
    }
    Singleton.getInstance = function () {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    };
    Singleton.prototype.add_consola = function (data) {
        this.consola += data;
    };
    Singleton.prototype.get_consola = function () {
        return this.consola;
    };
    Singleton.prototype.add_errores = function (data) {
        this.errores.push(data);
    };
    Singleton.prototype.get_errores = function () {
        return this.errores;
    };
    return Singleton;
}());
exports.Singleton = Singleton;
