"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Metodo = void 0;
var instruccion_1 = require("../abstract/instruccion");
var Metodo = /** @class */ (function (_super) {
    __extends(Metodo, _super);
    function Metodo(id, parametros, bloque, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        _this.parametros = parametros;
        _this.bloque = bloque;
        return _this;
    }
    Metodo.prototype.run = function (env) {
        env.guardar_funcion(this.id, this);
    };
    return Metodo;
}(instruccion_1.Instruccion));
exports.Metodo = Metodo;
