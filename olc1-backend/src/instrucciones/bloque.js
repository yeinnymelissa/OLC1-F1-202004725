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
exports.Bloque = void 0;
var instruccion_1 = require("../abstract/instruccion");
var entorno_1 = require("../simbolos/entorno");
var Bloque = /** @class */ (function (_super) {
    __extends(Bloque, _super);
    function Bloque(instrucciones, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.instrucciones = instrucciones;
        return _this;
    }
    Bloque.prototype.run = function (env) {
        //analisis semantivo 
        var new_env = new entorno_1.Entorno(env);
        // como acceder a otras tablas de simbolos padres
        // while(env!=null){
        //     //busqueda de dla variblea
        //     env = env.anterior
        // }
        for (var _i = 0, _a = this.instrucciones; _i < _a.length; _i++) {
            var elemento = _a[_i];
            try {
                elemento.run(new_env);
            }
            catch (error) {
                //console.log(error);
            }
        }
    };
    return Bloque;
}(instruccion_1.Instruccion));
exports.Bloque = Bloque;
