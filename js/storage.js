"use strict";

function obtenerHistorialPartidas() {
    var historialGuardado;

    historialGuardado = localStorage.getItem("habitacion404Historial");

    if (historialGuardado === null) {
        return [];
    }

    return JSON.parse(historialGuardado);
}

function guardarPartidaEnHistorial(partida) {
    var historial;

    historial = obtenerHistorialPartidas();
    historial.push(partida);

    localStorage.setItem("habitacion404Historial", JSON.stringify(historial));
}

function obtenerRanking() {
    var historial;

    historial = obtenerHistorialPartidas();

    historial.sort(function (a,b) {
        return b.puntaje - a.puntaje;
    });

    return historial.slice(0,5);
}

function limpiarHistorialPartidas() {
    localStorage.removeItem("habitacion404Historial");
}

function guardarTema(tema) {
    localStorage.setItem("habitacion404Tema", tema);
}

function obtenerTemaGuardado() {
    var tema;

    tema = localStorage.getItem("habitacion404Tema");

    if(tema === null) {
        return "oscuro";
    }

    return tema;
}