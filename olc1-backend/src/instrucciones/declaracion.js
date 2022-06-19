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
exports.Declaracion = void 0;
var instruccion_1 = require("../abstract/instruccion");
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(nombre, tipo, expresion, editable, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.nombre = nombre;
        _this.tipo = tipo;
        _this.expresion = expresion;
        _this.editable = editable;
        return _this;
    }
    Declaracion.prototype.run = function (env) {
        //codigo analisis semantico
        console.log("Declarando nueva variable: " + this.nombre);
        //console.log(this);
        var expresion = this.expresion.run(env);
        console.log(expresion);
        //preguntar si la variable esta libre
        if (env.buscar_variable(this.nombre)) {
            //error semenaticos
            throw "Error semantico, la variable ya existe, no se puede repetir en este entorno";
        }
        //si los tipos son correctos o hacen match
        // if(x.type==){
        //     //ingreso de la variable a la tabla simbolos
        // }
        // else{
        //     //reporte de error semantico
        // }
        env.guardar_variable(this.nombre, expresion.value, expresion.type);
    };
    return Declaracion;
}(instruccion_1.Instruccion));
exports.Declaracion = Declaracion;
