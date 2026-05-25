"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var botonJugar;
    var botonCerrarModal;
    var botonReiniciar;
    var botonPausa;
    var botonRanking;
    var botonInstrucciones;
    var botonTema;
    var botonLogros;
    var objetoComputadora;
    var objetoCaja;
    var objetoPanel;
    var objetoPuerta;


    botonJugar = obtenerElemento("boton-jugar");
    botonCerrarModal = obtenerElemento("boton-cerrar-modal");
    botonReiniciar = obtenerElemento("boton-reiniciar");
    botonPausa = obtenerElemento("boton-pausa");
    botonRanking = obtenerElemento("boton-ranking");
    botonInstrucciones = obtenerElemento("boton-instrucciones");
    botonTema = obtenerElemento("boton-tema");
    botonLogros = obtenerElemento("boton-logros");
    objetoComputadora = obtenerElemento("objeto-computadora");
    objetoCaja = obtenerElemento("objeto-caja");
    objetoPanel = obtenerElemento("objeto-panel");
    objetoPuerta = obtenerElemento("objeto-puerta");

    aplicarTemaGuardado();

    botonJugar.addEventListener("click", mostrarModalNombre);
    botonCerrarModal.addEventListener("click", cerrarModal);
    botonReiniciar.addEventListener("click", reiniciarPartida);
    botonPausa.addEventListener("click", alternarPausa);
    botonRanking.addEventListener("click", mostrarRanking);
    botonInstrucciones.addEventListener("click", mostrarInstrucciones);
    botonLogros.addEventListener("click", mostrarLogros);
    objetoComputadora.addEventListener("click", abrirComputadora);
    objetoCaja.addEventListener("click", abrirCajaFuerte);
    objetoPanel.addEventListener("click", abrirPanelElectrico);
    objetoPuerta.addEventListener("click", abrirPuerta);

    if (botonTema !== null) {
        botonTema.addEventListener("click", alternarTema);
    }
});


function mostrarModalNombre() {
    var contenido;

    contenido = "";
    contenido += "<p>Ingresá tu nombre para comenzar la partida.</p>";
    contenido += "<div class='campo-modal'>";
    contenido += "<label for='input-nombre-jugador'>Nombre del jugador</label>";
    contenido += "<input type='text' id='input-nombre-jugador' autocomplete='off'>";
    contenido += "<p id='error-nombre-jugador' class='mensaje-error'></p>";
    contenido += "</div>";
    contenido += "<button id='boton-comenzar-partida' class='boton boton-principal'>Comenzar partida</button>";

    abrirModal("Nueva partida", contenido);

    obtenerElemento("boton-comenzar-partida").addEventListener("click", validarInicioPartida);
    obtenerElemento("input-nombre-jugador").addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            validarInicioPartida();
        }
    });
}

 
function validarInicioPartida() {
    var inputNombre;
    var errorNombre;
    var resultadoValidacion;

    inputNombre = obtenerElemento("input-nombre-jugador");
    errorNombre = obtenerElemento("error-nombre-jugador");

    resultadoValidacion = validarNombreJugador(inputNombre.value);

    if (resultadoValidacion.valido === false) {
        errorNombre.textContent = resultadoValidacion.mensaje;
        return;
    }

    iniciarPartida(inputNombre.value.trim());
}