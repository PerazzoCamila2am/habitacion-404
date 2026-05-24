"use strict";

var estadoJuego = {
    nombreJugador: "",
    tiempoRestante: 600,
    vidas: 3,
    progreso: 0,
    totalObjetivos: 4,
    partidaActiva: false,
    juegoPausado: false,
    resultado: ""
};


function iniciarPartida(nombreJugador) {
    estadoJuego.nombreJugador = nombreJugador;
    estadoJuego.tiempoRestante = 600;
    estadoJuego.vidas = 3;
    estadoJuego.progreso = 0;
    estadoJuego.partidaActiva = true;
    estadoJuego.juegoPausado = false;
    estadoJuego.resultado = "";



actualizarNombreJugador(estadoJuego.nombreJugador);
actualizarTiempo(formatearTiempo(estadoJuego.tiempoRestante));
actualizarVidas(estadoJuego.vidas);
actualizarProgreso(estadoJuego.progreso, estadoJuego.totalObjetivos);

cerrarModal();
mostrarPantalla("pantalla-juego");
iniciarTemporizador();
}

function reiniciarPartida() {
    detenerTemporizador();

    if (estadoJuego.nombreJugador.trim().length >= 3) {
        iniciarPartida(estadoJuego.nombreJugador);
    } else{
        mostrarPantalla("pantalla-inicio");
        mostrarModalNombre();
    }
}

function alternarPausa() {
    if (estadoJuego.partidaActiva === false) {
        return;
    }

    if (estadoJuego.juegoPausado === false) {
        pausarTemporizador();
        mostrarModalPausa();
    } else {
        reanudarPartida();
    }
}

function mostrarModalPausa() {
    var contenido;

    contenido = "";
    contenido += "<p>La partida está pausada. El tiempo se detuvo hasta que decidas continuar.</p>";
    contenido += "<div class='acciones-inicio'>";
    contenido += "<button id='boton-continuar-partida' class='boton boton-principal'>Continuar</button>";
    contenido += "<button id='boton-reiniciar-modal' class='boton boton-secundario'>Reiniciar</button>";
    contenido += "</div>";

    abrirModal("Juego pausado", contenido);

    obtenerElemento("boton-continuar-partida").addEventListener("click", reanudarPartida);
    obtenerElemento("boton-reiniciar-modal").addEventListener("click", reiniciarPartida);
}

function reanudarPartida() {
    reanudarTemporizador();
    cerrarModal();
}

function perderPartida(mensaje) {
    estadoJuego.partidaActiva = false;
    estadoJuego.juegoPausado = false;
    estadoJuego.resultado = "Derrota";

    detenerTemporizador();

    mostrarModalFinPartida("Game Over", mensaje);
}

function ganarPartida() {
    estadoJuego.partidaActiva = false;
    estadoJuego.juegoPausado = false;
    estadoJuego.resultado = "Victoria";

    detenerTemporizador();

    mostrarModalFinPartida("Escape exitoso", "Lograste salir de la Habitación 404 antes de que el sistema se reinicie.");
}

function mostrarModalFinPartida(titulo, mensaje) {
    var contenido;

    contenido = "";
    contenido += "<p>" + mensaje + "</p>";
    contenido += "<p>Jugador: <strong>" + estadoJuego.nombreJugador + "</strong></p>";
    contenido += "<p>Tiempo restante: <strong>" + formatearTiempo(estadoJuego.tiempoRestante) + "</strong></p>";
    contenido += "<p>Vidas restantes: <strong>" + estadoJuego.vidas + "</strong></p>";
    contenido += "<div class= 'acciones-inicio'>";
    contenido += "<button id='boton-jugar-otra-vez' class='boton boton-principal'>Jugar otra vez</button>";
    contenido += "<button id='boton-volver-inicio' class='boton boton-secundario'>Volver al inicio</button>";
    contenido += "</div>";

    abrirModal(titulo, contenido);

    obtenerElemento("boton-jugar-otra-vez").addEventListener("click", reiniciarPartida);
    obtenerElemento("boton-volver-inicio").addEventListener("click", volverAlInicio);

}


function volverAlInicio() {
    detenerTemporizador();
    estadoJuego.partidaActiva = false;
    estadoJuego.juegoPausado = false;

    cerrarModal();
    mostrarPantalla("pantalla-inicio");
}