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
exports.Acceso = void 0;
var expresion_1 = require("../abstract/expresion");
var Acceso = /** @class */ (function (_super) {
    __extends(Acceso, _super);
    function Acceso(id, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.id = id;
        return _this;
    }
    Acceso.prototype.run = function (env) {
        //preguntar si exite variable
        //sino existe 
        //error semanticos
        var variable_ts = env.get_variable(this.id);
        if (variable_ts == null || variable_ts == undefined) {
            //errores semaintics
            throw "Error semantico, esta variable no existe! :c";
        }
        return {
            value: variable_ts.value,
            type: variable_ts.type
        };
    };
    return Acceso;
}(expresion_1.Expresion));
exports.Acceso = Acceso;
