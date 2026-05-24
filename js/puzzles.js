"use strict";

var interruptoresPanel = [false, false, false, false];

function abrirComputadora() {
    var contenido;

    if (estadoJuego.energiaRestaurada === false) {
        abrirModal(
            "Computadora apagada",
            "<p>La computadora no responde. Parece que primero tenés que restaurar la energía desde el panel eléctrico.</p>"
        );
        return;
    }

    if (estadoJuego.computadoraDesbloqueada === true) {
        abrirModal(
            "Computadora desbloqueada",
            "<p>La terminal ya fue desbloqueada. El sistema muestra el mensaje: <strong>Acceso final habilitado.</strong></p>"
        );
        return;
    }

    contenido = "";
    contenido += "<p>La computadora volvió a encederse. En la pantalla aparece una terminal bloqueada.</p>";
    contenido += "<p>Pista: <strong>La salida no se encuentra.</strong></p>";
    contenido += "<div class= 'campo-modal'>";
    contenido += "<label for= 'input-clave-computadora'> Contraseña de la terminal</label>";
    contenido += "<input type='text' id='input-clave-computadora' autocomplete='off'>";
    contenido += "<p id='error-clave-computadora' class='mensaje-error'></p>";
    contenido += "</div>";
    contenido += "<button id='boton-validar-computadora' class='boton boton-principal'>Desbloquear terminal</button>";

    abrirModal("Computadora", contenido);

    obtenerElemento("boton-validar-computadora").addEventListener("click", validarComputadora);

    obtenerElemento("input-clave-computadora").addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            validarComputadora();
        }
    });

}

function validarComputadora() {
    var inputClave;
    var errorClave;
    var claveIngresada;

    inputClave = obtenerElemento("input-clave-computadora");
    errorClave = obtenerElemento("error-clave-computadora");
    claveIngresada = inputClave.value.trim().toLowerCase();

    if (claveIngresada.length === 0) {
        errorClave.textContent = "Ingresá una contraseña para desbloquear la terminal.";
        return;
    }

    if (claveIngresada !== "error404") {
        perderVida("Contraseña incorrecta. Perdiste una vida.");
        return;
    }

    estadoJuego.computadoraDesbloqueada = true;
    completarObjetivo();

    abrirModal(
        "Terminal desbloqueada",
        "<p>La computadora aceptó la contraseña. El sistema indica que la puerta final puede ser desbloqueada con la tarjeta de acceso.</p> "
    );
}

function abrirCajaFuerte() {
    var contenido;

    if (estadoJuego.cajaAbierta === true) {
        abrirModal( 
            "Caja fuerte abierta",
            "<p>La caja fuerte ya está abierta. La tarjeta de acceso fue agregada al inventario.</p>"
        );
        return;
    }

    contenido = "";
    contenido += "<p>La caja fuerte tiene un teclado numérico.</p>";
    contenido += "<p>Una inscripción dice: <strong>El error comienza en cero.</strong></p>";
    contenido += "<div class='campo-modal'>";
    contenido += "<label for='input-codigo-caja'>Código de seguridad</label>";
    contenido += "<input type='text' id='input-codigo-caja' maxlength='4' autocomplete='off'>";
    contenido += "<p id='error-codigo-caja' class='mensaje-error'></p>";
    contenido += "</div>";
    contenido += "<button id='boton-validar-caja' class='boton boton-principal'>Abrir caja</button>";

    abrirModal("Caja fuerte", contenido);

    obtenerElemento("boton-validar-caja").addEventListener("click", validarCajaFuerte);

     obtenerElemento("input-codigo-caja").addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            validarCajaFuerte();
        }
    });

}


function validarCajaFuerte() {
    var inputCodigo;
    var errorCodigo;
    var codigoIngresado;

    inputCodigo = obtenerElemento("input-codigo-caja");
    errorCodigo = obtenerElemento("error-codigo-caja");
    codigoIngresado = inputCodigo.value.trim();

    if (codigoIngresado.length === 0) {
        errorCodigo.textContent = "Ingresá un código para abrir la caja.";
        return;
    }

    if (codigoIngresado !== "0404") {
        perderVida("Código incorrecto. Perdiste una vida.");
        return;
    }

    estadoJuego.cajaAbierta = true;
    estadoJuego.tarjetaEncontrada = true;

    agregarAlInventario("Tarjeta de acceso");
    completarObjetivo();

    abrirModal(
        "Caja abierta",
        "<p>La caja fuerte se abrió correctamente. Encontraste una tarjeta de acceso.</p>"
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
    var contenido;

    if (estadoJuego.energiaRestaurada === false) {
        abrirModal(
            "Puerta sin energía",
            "<p>La puerta principal no responde. Primero tenés que restaurar la energía desde el panel eléctrico.</p> "

        );
        return;
    }

    if (estadoJuego.tarjetaEncontrada === false) {
        abrirModal(
            "Acceso denegado",
            "<p>El lector de la puerta solicita una tarjeta de acceso. Buscá una forma de encontrarla dentro de la habitación.</p>"

        );
        return;
    }


    if (estadoJuego.computadoraDesbloqueada === false) {
        abrirModal(
            "Sistema bloqueado",
            "<p>La tarjeta fue detectada, pero la computadora principal todavía no habilitó la salida.</p> "

        );
        return;
    }

    contenido = "";
    contenido += "<p>La tarjeta fue aceptada y la computadora habilitó el acceso final.</p>";
    contenido += "<p>El sistema muestra el mensaje: <strong>Salida encontrada.</strong></p>";
    contenido += "<div class= 'acciones-inicio'>";
    contenido += "<button id='boton-abrir-puerta-final' class='boton boton-principal'>Abrir puerta</button>";
    contenido += "</div>";

    abrirModal("Puerta desbloqueada", contenido);

    obtenerElemento("boton-abrir-puerta-final").addEventListener("click", completarEscape);
}


function completarEscape() {
    if (estadoJuego.abrirPuerta === true) {
        return;
    }

    estadoJuego.puertaAbierta = true;
    completarObjetivo();
    ganarPartida();
}