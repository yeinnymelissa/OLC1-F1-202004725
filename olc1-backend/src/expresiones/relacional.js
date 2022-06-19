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
var opcionesRelacionales_1 = require("./opcionesRelacionales");
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
        if (this.type == opcionesRelacionales_1.opcionesRelacionales.MAYOR) {
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value > nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value > nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value > nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value > nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value > nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value > nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) > nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) > nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) > nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
        }
        else if (this.type == opcionesRelacionales_1.opcionesRelacionales.MENOR) {
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value < nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value < nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value < nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value < nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value < nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value < nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) < nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) < nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) < nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
        }
        else if (this.type == opcionesRelacionales_1.opcionesRelacionales.MAYORIGUAL) {
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value >= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value >= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value >= nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value >= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value >= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value >= nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) >= nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) >= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) >= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
        }
        else if (this.type == opcionesRelacionales_1.opcionesRelacionales.MENORIGUAL) {
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value <= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value <= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value <= nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value <= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value <= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value <= nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) <= nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) <= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) <= nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
        }
        else if (this.type == opcionesRelacionales_1.opcionesRelacionales.IGUAL) {
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value == nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value == nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value == nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value == nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value == nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value == nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) == nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) == nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.STRING && nodoDer.type == tipo_1.Tipo.STRING) {
                result = {
                    value: nodoIzq.value == nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.STRING && nodoDer.type == tipo_1.Tipo.STRING) {
                result = {
                    value: nodoIzq.value == nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.BOOLEAN && nodoDer.type == tipo_1.Tipo.BOOLEAN) {
                result = {
                    value: nodoIzq.value == nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
        }
        else if (this.type == opcionesRelacionales_1.opcionesRelacionales.DIFERENTEDE) {
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value != nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value != nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value != nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value != nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: nodoIzq.value != nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value != nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) != nodoDer.value.charCodeAt(0),
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: nodoIzq.value.charCodeAt(0) != nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.STRING && nodoDer.type == tipo_1.Tipo.STRING) {
                result = {
                    value: nodoIzq.value != nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.STRING && nodoDer.type == tipo_1.Tipo.STRING) {
                result = {
                    value: nodoIzq.value != nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
            else if (nodoIzq.type == tipo_1.Tipo.BOOLEAN && nodoDer.type == tipo_1.Tipo.BOOLEAN) {
                result = {
                    value: nodoIzq.value != nodoDer.value,
                    type: tipo_1.Tipo.BOOLEAN
                };
            }
        }
        return result;
    };
    return Relacional;
}(expresion_1.Expresion));
exports.Relacional = Relacional;
