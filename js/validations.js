"use strict";

function validarNombreJugador(nombre) {
    var nombreLimpio;

    nombreLimpio = nombre.trim();

    if (nombreLimpio.length < 3) {
        return {
            valido: false,
            mensaje: "El nombre debe tener al menos 3 caracteres."
        };
    }

    return {
        valido: true,
        mensaje: ""
    };
}