"use strict";

function obtenerElemento(id) {
    return document.getElementById(id);
}

function mostrarPantalla(idPantalla) {
    var pantallas;
    var i;

    pantallas = document.querySelectorAll(".pantalla");

    for (i = 0; i < pantallas.length; i++) {
        pantallas[i].classList.remove("pantalla-activa");
    }

    obtenerElemento(idPantalla).classList.add("pantalla-activa");
}

function abrirModal(titulo, contenido) {
    var modal;
    var tituloModal;
    var cuerpoModal;

    modal = obtenerElemento("modal-general");
    tituloModal = obtenerElemento("titulo-modal");
    cuerpoModal = obtenerElemento("cuerpo-modal");

    tituloModal.textContent = titulo;
    cuerpoModal.innerHTML = contenido;
    modal.classList.add("modal-activo");
}

function cerrarModal() {
    var modal;
    var cuerpoModal;

    modal = obtenerElemento("modal-general");
    cuerpoModal = obtenerElemento("cuerpo-modal");

    modal.classList.remove("modal-activo");
    cuerpoModal.innerHTML = "";
}

function actualizarNombreJugador(nombre) {
    obtenerElemento("nombre-jugador").textContent = nombre;
}

function actualizarVidas(vidas) {
    obtenerElemento("vidas-juego").textContent = vidas;
}

function actualizarTiempo(textoTiempo) {
    obtenerElemento("tiempo-juego").textContent = textoTiempo;
}

function actualizarProgreso(progreso, total) {
    obtenerElemento("progreso-juego").textContent = progreso + "/" + total;
}