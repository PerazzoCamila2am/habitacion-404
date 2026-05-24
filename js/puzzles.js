"use strict";

var interruptoresPanel = [false, false, false, false];

function abrirComputadora() {
    if (estadoJuego.energiaRestaurada === false) {
        abrirModal(
            "Computadora apagada",
            "<p>La computadora no responde. Parece que primero tenés que restaurar la energía.</p>"
        );
        return;
    }

    abrirModal(
        "Computadora bloqueada",
        "<p>La terminal solicita una contraseña. Este puzzle lo vamos a implementar en el próximo paso.</p>"
    );
}

function abrirCajaFuerte() {
    abrirModal(
        "Caja fuerte",
        "<p>La caja fuerte tiene un teclado numérico. Este puzzle lo vamos a implementar en el próximo paso.</p>"
    );
}

function abrirPanelElectrico() {
    var contenido;

    if (estadoJuego.energiaRestaurada === true) {
        abrirModal(
            "Panel eléctrico",
            "<p>La energía ya fue restaurada. El sistema principal volvió a estar activo.</p>"
        );
        return;
    }

    interruptoresPanel = [false, false, false, false];

    contenido = "";
    contenido += "<p>Una nota pegada al panel dice: <strong>La energía vuelve con el patrón 1011.</strong></p>";
    contenido += "<p>Activá los interruptores correctos para restaurar el sistema.</p>";
    contenido += "<div class='contenedor-interruptores'>";
    contenido += "<button id='interruptor-0' class='interruptor-panel'>OFF</button>";
    contenido += "<button id='interruptor-1' class='interruptor-panel'>OFF</button>";
    contenido += "<button id='interruptor-2' class='interruptor-panel'>OFF</button>";
    contenido += "<button id='interruptor-3' class='interruptor-panel'>OFF</button>";
    contenido += "</div>";
    contenido += "<button id='boton-validar-panel' class='boton boton-principal'>Restaurar energía</button>";

    abrirModal("Panel eléctrico", contenido);

    obtenerElemento("interruptor-0").addEventListener("click", function () {
        cambiarInterruptor(0);
    });

    obtenerElemento("interruptor-1").addEventListener("click", function () {
        cambiarInterruptor(1);
    });

    obtenerElemento("interruptor-2").addEventListener("click", function () {
        cambiarInterruptor(2);
    });

    obtenerElemento("interruptor-3").addEventListener("click", function () {
        cambiarInterruptor(3);
    });

    obtenerElemento("boton-validar-panel").addEventListener("click", validarPanelElectrico);
}

function cambiarInterruptor(posicion) {
    var boton;

    interruptoresPanel[posicion] = !interruptoresPanel[posicion];

    boton = obtenerElemento("interruptor-" + posicion);

    if (interruptoresPanel[posicion] === true) {
        boton.textContent = "ON";
        boton.classList.add("interruptor-activo");
    } else {
        boton.textContent = "OFF";
        boton.classList.remove("interruptor-activo");
    }
}

function validarPanelElectrico() {
    if (
        interruptoresPanel[0] === true &&
        interruptoresPanel[1] === false &&
        interruptoresPanel[2] === true &&
        interruptoresPanel[3] === true
    ) {
        estadoJuego.energiaRestaurada = true;
        completarObjetivo();

        abrirModal(
            "Energía restaurada",
            "<p>El panel se encendió correctamente. La computadora principal volvió a funcionar.</p>"
        );

        return;
    }

    perderVida("Patrón incorrecto. Perdiste una vida.");
}

function abrirPuerta() {
    if (estadoJuego.progreso < estadoJuego.totalObjetivos) {
        abrirModal(
            "Puerta bloqueada",
            "<p>La puerta principal sigue bloqueada. Todavía faltan objetivos por completar.</p>"
        );
        return;
    }

    ganarPartida();
}