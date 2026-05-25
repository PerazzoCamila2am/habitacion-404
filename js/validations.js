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

function validarNombreContacto(nombre) {
    var expresionNombre;
    var nombreLimpio;

    nombreLimpio = nombre.trim();
    expresionNombre = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$/;

    if (nombreLimpio.length === 0) {
        return {
            valido: false,
            mensaje: "El nombre es obligatorio."
        };
    }

    if (expresionNombre.test(nombreLimpio) === false) {
        return {
            valido: false,
            mensaje: "El nombre solo puede contener letras y números."
        };
    }

    return {
        valido: true,
        mensaje: ""
    };
}

function validarMailContacto(mail) {
    var expresionMail;
    var mailLimpio;

    mailLimpio = mail.trim();
    expresionMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mailLimpio.length === 0) {
        return {
            valido: false,
            mensaje:"El mail es obligatorio."
        };
    }

    if (expresionMail.test(mailLimpio) === false) {
        return {
            valido: false,
            mensaje: "Ingresá un mail válido."
        };
    }

    return {
        valido: true,
        mensaje: ""
    };
}

function validarMensajeContacto(mensaje) {
    var mensajeLimpio;

    mensajeLimpio = mensaje.trim();

    if (mensajeLimpio.length <= 5) {
        return {
            valido: false,
            mensaje: "El mensaje debe tener más de 5 caracteres."
        };
    }

    return {
        valido: true,
        mensaje: ""
    };
}