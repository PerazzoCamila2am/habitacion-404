"use strict";

var estadoJuego = {
    nombreJugador: "",
    dificultad: "normal",
    tiempoInicial: 600,
    VidasIniciales: 3,
    tiempoRestante: 600,
    vidas: 3,
    progreso: 0,
    totalObjetivos: 4,
    partidaActiva: false,
    juegoPausado: false,
    resultado: "",
    energiaRestaurada: false,
    cajaAbierta: false,
    computadoraDesbloqueada: false,
    tarjetaEncontrada: false,
    puertaAbierta: false,
    inventario: []
};

function configurarDificultad(dificultad) {
    estadoJuego.dificultad = dificultad;

    if (dificultad === "facil") {
        estadoJuego.tiempoInicial = 720;
        estadoJuego.VidasIniciales = 5;
        return;
    }

    if (dificultad === "dificil") {
        estadoJuego.tiempoInicial = 420;
        estadoJuego.VidasIniciales = 2;
        return;
    }

    estadoJuego.tiempoInicial = 600;
    estadoJuego.VidasIniciales = 3;
}

function obtenerDificultadSeleccionada() {
    var opciones;
    var i;

    opciones = document.querySelectorAll("input[name='dificultad']");

    for (i=0; i < opciones.length; i++) {
        if (opciones[i].checked === true) {
            return opciones[i].ariaValueMax;
        }
    }
    return "normal";
}


function iniciarPartida(nombreJugador) {
    configurarDificultad(obtenerDificultadSeleccionada());

    estadoJuego.nombreJugador = nombreJugador;
    estadoJuego.tiempoRestante = estadoJuego.tiempoInicial;
    estadoJuego.vidas = estadoJuego.vidasIniciales;
    estadoJuego.progreso = 0;
    estadoJuego.partidaActiva = true;
    estadoJuego.juegoPausado = false;
    estadoJuego.resultado = "";
    estadoJuego.energiaRestaurada = false;
    estadoJuego.cajaAbierta = false;
    estadoJuego.computadoraDesbloqueada = false;
    estadoJuego.tarjetaEncontrada = false;
    estadoJuego.puertaAbierta = false;
    estadoJuego.inventario = [];




actualizarNombreJugador(estadoJuego.nombreJugador);
actualizarTiempo(formatearTiempo(estadoJuego.tiempoRestante));
actualizarVidas(estadoJuego.vidas);
actualizarProgreso(estadoJuego.progreso, estadoJuego.totalObjetivos);
actualizarInventario();

cerrarModal();
mostrarPantalla("pantalla-juego");
reproducirSonido("click");
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

function completarObjetivo() {
    estadoJuego.progreso++;
    actualizarProgreso(estadoJuego.progreso, estadoJuego.totalObjetivos);
    reproducirSonido("exito");
}

function perderVida(mensaje) {
    estadoJuego.vidas--;
    actualizarVidas(estadoJuego.vidas);
    reproducirSonido("error");

    if (estadoJuego.vidas <=0) {
        perderPartida("Te quedaste sin vidas. El sistema bloqueó la habitación.");
        return;
    }

    mostrarMensajeModal(mensaje);
}

function agregarAlInventario(nombreObjeto) {
    estadoJuego.inventario.push(nombreObjeto);
    actualizarInventario();
}

function perderPartida(mensaje) {
    estadoJuego.partidaActiva = false;
    estadoJuego.juegoPausado = false;
    estadoJuego.resultado = "Derrota";

    detenerTemporizador();
    guardarResultadoPartida();
    reproducirSonido("error");

    mostrarModalFinPartida("Game Over", mensaje);
}

function ganarPartida() {
    estadoJuego.partidaActiva = false;
    estadoJuego.juegoPausado = false;
    estadoJuego.resultado = "Victoria";

    detenerTemporizador();
    guardarResultadoPartida();
    reproducirSonido("victoria");

    mostrarModalFinPartida("Escape exitoso", "Lograste salir de la Habitación 404 antes de que el sistema se reinicie.");
}

function mostrarModalFinPartida(titulo, mensaje) {
    var contenido;

    contenido = "";
    contenido += "<p>" + mensaje + "</p>";
    contenido += "<p>Jugador: <strong>" + estadoJuego.nombreJugador + "</strong></p>";
    contenido += "<p>Dificultad: <strong>" + obtenerTextoDificultad() +"</strong></p>";
    contenido += "<p>Tiempo restante: <strong>" + formatearTiempo(estadoJuego.tiempoRestante) + "</strong></p>";
    contenido += "<p>Vidas restantes: <strong>" + estadoJuego.vidas + "</strong></p>";
    contenido += "<p>Puntaje final: <strong>" + calcularPuntajeFinal() + "</strong></p>";
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


function calcularPuntajeFinal() {
    var puntaje;
    var bonusResultado;

    bonusResultado = 0;

    if(estadoJuego.resultado === "Victoria") {
        bonusResultado = 500;
    }

    puntaje = 0;
    puntaje += estadoJuego.tiempoRestante * 2;
    puntaje += estadoJuego.vidas * 100;
    puntaje += estadoJuego.progreso * 150;
    puntaje += bonusResultado;

    return puntaje;
}

function guardarResultadoPartida() {
    var partida;
    var fechaActual;

    fechaActual = new Date();
    partida = {
        jugador: estadoJuego.nombreJugador,
        resultado: estadoJuego.resultado,
        dificultad: obtenerTextoDificultad(),
        puntaje: calcularPuntajeFinal(),
        tiempoRestante: formatearTiempo(estadoJuego.tiempoRestante),
        vidasRestantes: estadoJuego.vidas,
        progreso: estadoJuego.progreso + "/" + estadoJuego.totalObjetivos,
        fecha: fechaActual.toLocaleDateString()
    };

    guardarPartidaEnHistorial(partida);
}

function obtenerTextoDificultad() {
    if (estadoJuego.dificultad === "facil") {
        return "Fácil";
    }

    if (estadoJuego.dificultad === "dificil") {
        return "Difícil";
    }

    return "Normal";
}