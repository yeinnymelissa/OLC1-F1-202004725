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
exports.Println = void 0;
var instruccion_1 = require("../abstract/instruccion");
var singleton_1 = require("../patronSigleton/singleton");
var Println = /** @class */ (function (_super) {
    __extends(Println, _super);
    function Println(expresion, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.expresion = expresion;
        return _this;
    }
    Println.prototype.run = function (env) {
        //console.log(this.expresion) 
        //console.log("---------------");
        var tmp = this.expresion.run(env);
        console.log("prueba");
        console.log(tmp);
        console.log(tmp.type);
        //console.log(">>",tmp.value); //esto es lo que tienen que mostrar al usuario
        var s = singleton_1.Singleton.getInstance();
        s.add_consola(tmp.value + "\n");
    };
    return Println;
}(instruccion_1.Instruccion));
exports.Println = Println;
