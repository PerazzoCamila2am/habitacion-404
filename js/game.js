"use strict";

var estadoJuego = {
    nombreJugador: "",
    tiempoRestante: 600,
    vidas: 3,
    progreso: 0,
    totalObjetivos: 4,
    partidaActiva: false,
    juegoPausado: false
};


function iniciarPartida(nombreJugador) {
    estadoJuego.nombreJugador = nombreJugador;
    estadoJuego.tiempoRestante = 600;
    estadoJuego.vidas = 3;
    estadoJuego.progreso = 0;
    estadoJuego.partidaActiva = true;
    estadoJuego.juegoPausado = false;



actualizarNombreJugador(estadoJuego.nombreJugador);
actualizarTiempo("10:00");
actualizarVidas(estadoJuego.vidas);
actualizarProgreso(estadoJuego.progreso, estadoJuego.totalObjetivos);

cerrarModal();
mostrarPantalla("pantalla-juego");
}

function reiniciarPartida() {
    iniciarPartida(estadoJuego.nombreJugador);
}