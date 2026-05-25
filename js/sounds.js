"use strict";

var contextoAudio = null;

function obtenerContextoAudio() {
    if (contextoAudio === null) {
        contextoAudio = new (window.AudioContext || window.webkitAudioContext)();
    }

    return contextoAudio;
}

function reproducirSonido(tipo) {
    var contexto;
    var oscilador;
    var ganancia;
    var frecuencia;
    var duracion;

    if (tipo === "error") {
        frecuencia = 180;
        duracion = 0.22;
    } else if (tipo === "victoria") {
        frecuencia = 720;
        duracion = 0.22;
    } else if (tipo === "exito") {
        frecuencia = 520;
        duracion = 0.18;
    } else {
        frecuencia = 320;
        duracion = 0.1;
    }

    contexto = obtenerContextoAudio();
    oscilador = contexto.createOscillator();
    ganancia = contexto.createGain();

    oscilador.type = "sine";
    oscilador.frequency.value = frecuencia;

    ganancia.gain.setValueAtTime(0.08, contexto.currentTime);
    ganancia.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + duracion);

    oscilador.connect(ganancia);
    ganancia.connect(contexto.destination);

    oscilador.start(contexto.currentTime);
    oscilador.stop(contexto.currentTime + duracion);
}