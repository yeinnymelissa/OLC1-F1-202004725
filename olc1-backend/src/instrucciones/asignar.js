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
exports.Asignar = void 0;
var instruccion_1 = require("../abstract/instruccion");
var Asignar = /** @class */ (function (_super) {
    __extends(Asignar, _super);
    function Asignar(nombre, expresion, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.nombre = nombre;
        _this.expresion = expresion;
        return _this;
    }
    Asignar.prototype.run = function (env) {
        env.actualizar_variable(this.nombre, this.expresion);
    };
    Asignar.prototype.graficar = function () {
        //singleton, una funcion agregar reporte ast
        //
    };
    return Asignar;
}(instruccion_1.Instruccion));
exports.Asignar = Asignar;
