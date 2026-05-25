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


function mostrarRanking() {
    var ranking;
    var contenido;
    var i;

    ranking = obtenerRanking();
    contenido = "";

    if (ranking.length === 0) {
        contenido += "<p>Todavía no hay partidas registradas.</p>";
    } else {
        contenido += "<p>Mejores partidas guardadas en este navegador.</p>";
        contenido += "<div class= 'tabla-ranking'>";
        contenido += "<div class= 'fila-ranking encabezado-ranking'>";
        contenido += "<span>Jugador</span>";
        contenido += "<span>Resultado</span>";
        contenido += "<span>Puntaje</span>";
        contenido += "</div>";

        for (i=0; i < ranking.length; i++) {
            contenido += "<div class='fila-ranking'>";
            contenido += "<span>" + ranking[i].jugador + "</span>";
            contenido += "<span>" + ranking[i].resultado + "</span>";
            contenido += "<span>" + ranking[i].puntaje + "</span>";
            contenido += "</div>";
        }

        contenido += "</div>";
        contenido += "<button id= 'boton-limpiar-ranking' class='boton boton-secundario'>Limpiar ranking</button>";
    }

    abrirModal("Ranking", contenido);

    if (ranking.length > 0) {
        obtenerElemento("boton-limpiar-ranking").addEventListener("click", confirmarLimpiarRanking);

    }
}

function confirmarLimpiarRanking() {
    var contenido;

    contenido = "";
    contenido += "<p>¿Seguro que querés borrar el ranking guardado?</p>";
    contenido += "<div class= 'acciones-inicio'>";
    contenido += "<button id='boton-confirmar-limpiar-ranking' class='boton boton-principal'>Si, borrar</button>";
    contenido += "<button id='boton-cancelar-limpiar-ranking' class='boton boton-secundario'>Cancelar</button>";
    contenido += "</div>";

    abrirModal("Borrar ranking", contenido);

    obtenerElemento("boton-confirmar-limpiar-ranking").addEventListener("click", function() {
        limpiarHistorialPartidas();
        mostrarRanking();
    } );

    obtenerElemento("boton-cancelar-limpiar-ranking").addEventListener("click", mostrarRanking);
}

function mostrarInstrucciones() {
    var contenido;

    contenido = "";
    contenido += "<p><strong>Objetivo:</strong> escapá de La Habitación 404 antes de que el tiempo a cero.</p>";
    contenido += "<p>Para avanzar, tenés que explorar los objetos de la habitación y resolver los puzzles.</p>";
    contenido += "<div class='lista-instrucciones'>";
    contenido += "<p><strong>Computadora:</strong>necesitás restaurar la energía antes de usarla.</p>";
    contenido += "<p><strong>Caja fuerte:</strong>contiene una tarjeta de acceso.</p>";
    contenido += "<p><strong>Panel eléctrico:</strong>permite volver a encender el sistema.</p>";
    contenido += "<p><strong>Puerta:</strong> se abre cuando completás todos los objetivos.</p>";
    contenido += "</div>";
    contenido += "<p>Tenés <strong>3 vidas</strong>. Si fallás códigos o contraseñas, perdés una vida.</p>";
    contenido += "<p>El ranking se guarda en este navegador usando LocalStorage.</p>";

    abrirModal("Instrucciones", contenido);

}