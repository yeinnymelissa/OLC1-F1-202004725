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
exports.Relacional = void 0;
var expresion_1 = require("../abstract/expresion");
var tipo_1 = require("../simbolos/tipo");
var opcionesLogicas_1 = require("./opcionesLogicas");
var Relacional = /** @class */ (function (_super) {
    __extends(Relacional, _super);
    function Relacional(left, right, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.left = left;
        _this.right = right;
        _this.type = type;
        return _this;
    }
    Relacional.prototype.run = function (env) {
        var result = {
            value: null,
            type: tipo_1.Tipo.error
        };
        var nodoIzq = this.left.run(env);
        var nodoDer = this.right.run(env);
        if (this.type == opcionesLogicas_1.opcionesLogicas.NOT) {
            if (nodoIzq.value == true) {
                result = {
                    value: false,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.value == false) {
                result = {
                    value: false,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
        }
        else if (this.type == opcionesLogicas_1.opcionesLogicas.XOR) {
            if (nodoIzq.value == false && nodoDer.value == false) {
                result = {
                    value: false,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.value == false && nodoDer.value == true) {
                result = {
                    value: true,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.value == true && nodoDer.value == false) {
                result = {
                    value: true,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.value == true && nodoDer.value == true) {
                result = {
                    value: false,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
        }
        else if (this.type == opcionesLogicas_1.opcionesLogicas.AND) {
            if (nodoIzq.value == false && nodoDer.value == false) {
                result = {
                    value: false,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.value == false && nodoDer.value == true) {
                result = {
                    value: false,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.value == true && nodoDer.value == false) {
                result = {
                    value: false,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.value == true && nodoDer.value == true) {
                result = {
                    value: true,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
        }
        else if (this.type == opcionesLogicas_1.opcionesLogicas.OR) {
            if (nodoIzq.value == false && nodoDer.value == false) {
                result = {
                    value: false,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.value == false && nodoDer.value == true) {
                result = {
                    value: true,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.value == true && nodoDer.value == false) {
                result = {
                    value: true,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.value == true && nodoDer.value == true) {
                result = {
                    value: true,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
        }
        return result;
    };
    return Relacional;
}(expresion_1.Expresion));
exports.Relacional = Relacional;
