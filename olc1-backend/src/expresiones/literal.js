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
exports.Literal = void 0;
var expresion_1 = require("../abstract/expresion");
var tipo_1 = require("../simbolos/tipo");
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    function Literal(value, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.value = value;
        _this.type = type;
        return _this;
    }
    Literal.prototype.run = function (env) {
        if (this.type == tipo_1.Tipo.INT)
            return { value: Number(this.value), type: tipo_1.Tipo.INT };
        else if (this.type == tipo_1.Tipo.STRING) {
            this.value = (this.value).replaceAll("\"", "");
            return { value: this.value, type: tipo_1.Tipo.STRING };
        }
        else if (this.type == tipo_1.Tipo.BOOLEAN) {
            if (this.value == "true")
                return { value: Boolean(true), type: tipo_1.Tipo.BOOLEAN };
            else
                return { value: Boolean(false), type: tipo_1.Tipo.BOOLEAN };
        }
        else if (this.type == tipo_1.Tipo.DOUBLE) {
            return { value: Number(this.value), type: tipo_1.Tipo.INT };
        }
        else if (this.type == tipo_1.Tipo.CHAR) {
            this.value = (this.value).replaceAll("\'", "");
            return { value: this.value, type: tipo_1.Tipo.CHAR };
        }
        else if (this.type == tipo_1.Tipo.NULL) {
            return { value: null, type: tipo_1.Tipo.NULL };
        }
        else
            return { value: this.value, type: tipo_1.Tipo.error };
    };
    return Literal;
}(expresion_1.Expresion));
exports.Literal = Literal;
