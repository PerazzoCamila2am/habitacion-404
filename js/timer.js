"use strict";

var intervaloTiempo = null;

function iniciarTemporizador() {
    detenerTemporizador();

    intervaloTiempo = setInterval(function () {
        if (estadoJuego.partidaActiva === false || estadoJuego.juegoPausado === true) {
            return;
        }

        estadoJuego.tiempoRestante--;

        actualizarTiempo(formatearTiempo(estadoJuego.tiempoRestante));

        if (estadoJuego.tiempoRestante <=0) {
            perderPartida("El tiempo llegó a cero. El sistema se reinició y la habitación quedó bloqueada.");
        }
    }, 1000);
}

function detenerTemporizador() {
    if (intervaloTiempo !== null) {
        clearInterval(intervaloTiempo);
        intervaloTiempo = null;
    }
}

function pausarTemporizador() {
    estadoJuego.juegoPausado = true;
}

function reanudarTemporizador() {
    estadoJuego.juegoPausado = false;
}

function formatearTiempo(segundosTotales) {
    var minutos;
    var segundos;
    var textoMinutos;
    var textoSegundos;

    minutos = Math.floor(segundosTotales / 60);
    segundos = segundosTotales % 60;

    if (minutos < 10 ) {
        textoMinutos = "0" + minutos;
    } else {
        textoMinutos = "" + minutos;
    }

    if (segundos < 10) {
        textoSegundos = "0" + segundos;
    } else {
        textoSegundos = "" + segundos;
    }

    return textoMinutos + ":" + textoSegundos;
}