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
exports.Aritmeticas = void 0;
var expresion_1 = require("../abstract/expresion");
var tipo_1 = require("../simbolos/tipo");
var opcionesAritmeticas_1 = require("./opcionesAritmeticas");
var Aritmeticas = /** @class */ (function (_super) {
    __extends(Aritmeticas, _super);
    function Aritmeticas(left, right, type, line, column) {
        var _this = _super.call(this, line, column) || this;
        _this.left = left;
        _this.right = right;
        _this.type = type;
        return _this;
    }
    Aritmeticas.prototype.run = function (env) {
        var result = {
            value: null,
            type: tipo_1.Tipo.error
        };
        var nodoIzq = this.left.run(env);
        var nodoDer = this.right.run(env);
        if (this.type == opcionesAritmeticas_1.opcionesAritmeticas.MAS) {
            //INT CON INT
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value + nodoDer.value),
                    type: tipo_1.Tipo.INT
                };
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.DOUBLE
                || nodoDer.type == tipo_1.Tipo.DOUBLE && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value + nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // STRING CON INT O INT CON STRING
            else if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.STRING
                || nodoDer.type == tipo_1.Tipo.STRING && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (String(nodoIzq.value) + String(nodoDer.value)),
                    type: tipo_1.Tipo.STRING
                };
            } // CHAR CON INT
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) + nodoDer.value),
                    type: tipo_1.Tipo.INT
                };
            } // INT CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value + nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.INT
                };
            } // STRING CON STRING 
            else if (nodoIzq.type == tipo_1.Tipo.STRING && nodoDer.type == tipo_1.Tipo.STRING) {
                result = {
                    value: (String(nodoIzq.value) + String(nodoDer.value)),
                    type: tipo_1.Tipo.STRING
                };
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (nodoIzq.value + nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value + nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) + nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // DOUBLE CON STRING O STRING CON DOUBLE
            else if (nodoDer.type == tipo_1.Tipo.DOUBLE && nodoIzq.type == tipo_1.Tipo.STRING
                || nodoDer.type == tipo_1.Tipo.STRING && nodoIzq.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (String(nodoIzq.value) + String(nodoDer.value)),
                    type: tipo_1.Tipo.STRING
                };
            } // CHAR CON STRING O STRING CON CHAR
            else if (nodoDer.type == tipo_1.Tipo.CHAR && nodoIzq.type == tipo_1.Tipo.STRING
                || nodoDer.type == tipo_1.Tipo.STRING && nodoIzq.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (String(nodoIzq.value) + String(nodoDer.value)),
                    type: tipo_1.Tipo.STRING
                };
            } // CHAR CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) + nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.INT
                };
            }
            else if (nodoDer.type == tipo_1.Tipo.BOOLEAN && nodoIzq.type == tipo_1.Tipo.STRING
                || nodoDer.type == tipo_1.Tipo.STRING && nodoIzq.type == tipo_1.Tipo.BOOLEAN) {
                result = {
                    value: (String(nodoIzq.value) + String(nodoDer.value)),
                    type: tipo_1.Tipo.STRING
                };
            }
            //demas validadionces para la operaciones aritmeticas
        }
        else if (this.type == opcionesAritmeticas_1.opcionesAritmeticas.MENOS) {
            // INT CON INT
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value - nodoDer.value),
                    type: tipo_1.Tipo.INT
                };
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.DOUBLE
                || nodoDer.type == tipo_1.Tipo.DOUBLE && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value - nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON INT
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) - nodoDer.value),
                    type: tipo_1.Tipo.INT
                };
            } // INT CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value - nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.INT
                };
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (nodoIzq.value - nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value - nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) - nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) - nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.INT
                };
            }
            //en la resta unicamente quiero con numeros
        }
        else if (this.type == opcionesAritmeticas_1.opcionesAritmeticas.MULTIPLICACION) {
            //INT CON INT
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value * nodoDer.value),
                    type: tipo_1.Tipo.INT
                };
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.DOUBLE
                || nodoDer.type == tipo_1.Tipo.DOUBLE && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value * nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON INT
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) * nodoDer.value),
                    type: tipo_1.Tipo.INT
                };
            } // INT CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value * nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.INT
                };
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (nodoIzq.value * nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value * nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) * nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) * nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.INT
                };
            }
        }
        else if (this.type == opcionesAritmeticas_1.opcionesAritmeticas.DIVISION) {
            //INT CON INT
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value / nodoDer.value),
                    type: tipo_1.Tipo.INT
                };
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.DOUBLE
                || nodoDer.type == tipo_1.Tipo.DOUBLE && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value / nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON INT
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) / nodoDer.value),
                    type: tipo_1.Tipo.INT
                };
            } // INT CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value / nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.INT
                };
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (nodoIzq.value / nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value / nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) / nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) / nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.INT
                };
            }
        }
        else if (this.type == opcionesAritmeticas_1.opcionesAritmeticas.POTENCIA) {
            //INT CON INT
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (Math.pow(nodoIzq.value, nodoDer.value)),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.DOUBLE
                || nodoDer.type == tipo_1.Tipo.DOUBLE && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (Math.pow(nodoIzq.value, nodoDer.value)),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON INT
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: (Math.pow(nodoIzq.value.charCodeAt(0), nodoDer.value)),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // INT CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (Math.pow(nodoIzq.value, nodoDer.value.charCodeAt(0))),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (Math.pow(nodoIzq.value, nodoDer.value)),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (Math.pow(nodoIzq.value, nodoDer.value.charCodeAt(0))),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (Math.pow(nodoIzq.value.charCodeAt(0), nodoDer.value)),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (Math.pow(nodoIzq.value.charCodeAt(0), nodoDer.value.charCodeAt(0))),
                    type: tipo_1.Tipo.DOUBLE
                };
            }
        }
        else if (this.type == opcionesAritmeticas_1.opcionesAritmeticas.MODULO) {
            //INT CON INT
            if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value % nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == tipo_1.Tipo.INT && nodoIzq.type == tipo_1.Tipo.DOUBLE
                || nodoDer.type == tipo_1.Tipo.DOUBLE && nodoIzq.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value % nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON INT
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.INT) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) % nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // INT CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.INT && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value % nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (nodoIzq.value % nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.DOUBLE && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value % nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.DOUBLE) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) % nodoDer.value),
                    type: tipo_1.Tipo.DOUBLE
                };
            } // CHAR CON CHAR
            else if (nodoIzq.type == tipo_1.Tipo.CHAR && nodoDer.type == tipo_1.Tipo.CHAR) {
                result = {
                    value: (nodoIzq.value.charCodeAt(0) % nodoDer.value.charCodeAt(0)),
                    type: tipo_1.Tipo.DOUBLE
                };
            }
        }
        return result;
    };
    return Aritmeticas;
}(expresion_1.Expresion));
exports.Aritmeticas = Aritmeticas;
