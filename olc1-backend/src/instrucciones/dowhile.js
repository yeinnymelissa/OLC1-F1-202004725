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
exports.DoWhile = void 0;
var instruccion_1 = require("../abstract/instruccion");
var DoWhile = /** @class */ (function (_super) {
    __extends(DoWhile, _super);
    function DoWhile(condicion, bloque_do, bloque_verdadero, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.condicion = condicion;
        _this.bloque_do = bloque_do;
        _this.bloque_verdadero = bloque_verdadero;
        return _this;
    }
    DoWhile.prototype.run = function (env) {
        //confirmar que la expresion es de tipo booleana
        var x = this.condicion.run(env);
        if (x.type == 3) {
            throw "Error semantico, el while necesita una condicion boolena";
        }
        do {
            this.bloque_do.run(env);
        } while (x);
        {
            this.bloque_verdadero.run(env);
            x = this.condicion.run(env);
        }
    };
    return DoWhile;
}(instruccion_1.Instruccion));
exports.DoWhile = DoWhile;
