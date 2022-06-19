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
exports.Incremento = void 0;
var instruccion_1 = require("../abstract/instruccion");
var Incremento = /** @class */ (function (_super) {
    __extends(Incremento, _super);
    function Incremento(nombre, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.nombre = nombre;
        return _this;
    }
    Incremento.prototype.run = function (env) {
        var _a;
        var variable = (_a = env.get_variable(this.nombre)) === null || _a === void 0 ? void 0 : _a.value;
        if (variable.type == Number) {
            env.actualizar_variable(this.nombre, variable++);
        }
        else {
            //error semantico
        }
    };
    Incremento.prototype.graficar = function () {
        //singleton, una funcion agregar reporte ast
        //
    };
    return Incremento;
}(instruccion_1.Instruccion));
exports.Incremento = Incremento;
