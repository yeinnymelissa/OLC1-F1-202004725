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
exports.While = void 0;
var instruccion_1 = require("../abstract/instruccion");
var While = /** @class */ (function (_super) {
    __extends(While, _super);
    function While(condicion, bloque_verdadero, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.condicion = condicion;
        _this.bloque_verdadero = bloque_verdadero;
        return _this;
    }
    While.prototype.run = function (env) {
        //confirmar que la expresion es de tipo booleana
        var x = this.condicion.run(env);
        if (x.type == 3) {
            throw "Error semantico, el while necesita una condicion boolena";
        }
        while (x) {
            this.bloque_verdadero.run(env);
            x = this.condicion.run(env);
        }
    };
    return While;
}(instruccion_1.Instruccion));
exports.While = While;
