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

function actualizarInventario() {
    var listaInventario;
    var i;
    var item;

    listaInventario = obtenerElemento("lista-inventario");
    listaInventario.innerHTML = "";

    if (estadoJuego.inventario.length === 0) {
        item = document.createElement("li");
        item.textContent = "Vacío";
        listaInventario.appendChild(item);
        return;
    }

    for (i = 0; i < estadoJuego.inventario.length; i++) {
        item = document.createElement("li");
        item.textContent = estadoJuego.inventario[i];
        listaInventario.appendChild(item);
    }
}

function mostrarMensajeModal(mensaje) {
    var cuerpoModal;
    var parrafo;

    cuerpoModal = obtenerElemento("cuerpo-modal");

    parrafo = document.createElement("p");
    parrafo.className = "mensaje-error";
    parrafo.textContent = mensaje;

    cuerpoModal.appendChild(parrafo);
}