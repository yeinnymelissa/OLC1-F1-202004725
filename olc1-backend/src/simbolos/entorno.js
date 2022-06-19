"use strict";
exports.__esModule = true;
exports.Entorno = void 0;
var simbolo_1 = require("./simbolo");
var tipo_1 = require("./tipo");
var Entorno = /** @class */ (function () {
    function Entorno(anterior) {
        this.anterior = anterior;
        this.tablaSimbolos = new Map();
        this.tablaSimbolos_metodos = new Map();
    }
    Entorno.prototype.getEnv = function () {
        return this.tablaSimbolos;
    };
    Entorno.prototype.guardar_funcion = function (nombre, valor) {
        //verificar que no existan duplicados
        this.tablaSimbolos_metodos.set(nombre, valor);
    };
    Entorno.prototype.guardar_variable = function (nombre, valor, tipo) {
        if (!this.buscar_variable(nombre)) {
            this.tablaSimbolos.set(nombre, new simbolo_1.Simbolo(valor, nombre, tipo, true));
            return true;
        }
        console.log("esta variable [" + nombre + "] ya existe...");
        return false;
    };
    Entorno.prototype.buscar_variable = function (nombre) {
        for (var _i = 0, _a = Array.from(this.tablaSimbolos.entries()); _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry[0] == nombre)
                return true;
        }
        return false;
    };
    Entorno.prototype.getTipo_variable = function (nombre) {
        for (var _i = 0, _a = Array.from(this.tablaSimbolos.entries()); _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry[0] == nombre)
                return entry[1].type;
        }
        return tipo_1.Tipo.error;
    };
    Entorno.prototype.actualizar_variable = function (nombre, new_valor) {
        for (var _i = 0, _a = Array.from(this.tablaSimbolos.entries()); _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry[0] == nombre) {
                if (entry[1].value.editable == true) {
                    entry[1].value = new_valor;
                }
                else {
                    //error semantico
                }
            }
        }
    };
    Entorno.prototype.get_variable = function (nombre) {
        var env = this;
        while (env != null) {
            if (env.tablaSimbolos.has(nombre))
                return env.tablaSimbolos.get(nombre);
            env = env.anterior;
        }
        return null;
    };
    return Entorno;
}());
exports.Entorno = Entorno;
