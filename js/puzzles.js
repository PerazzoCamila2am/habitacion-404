"use strict";

var interruptoresPanel = [false, false, false, false];

function abrirComputadora() {
    var contenido;

    if (estadoJuego.nivelActual === 2) {
        abrirServidorCentral();
        return;
    }

    if (estadoJuego.energiaRestaurada === false) {
        actualizarAvatar("pista", "La computadora no tiene energía. Revisá el panel eléctrico.");
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
    actualizarAvatar("exito", "Terminal desbloqueada. La salida final está más cerca.");

    abrirModal(
        "Terminal desbloqueada",
        "<p>La computadora aceptó la contraseña. El sistema indica que la puerta final puede ser desbloqueada con la tarjeta de acceso.</p> "
    );
}

function abrirCajaFuerte() {
    var contenido;

    if (estadoJuego.nivelActual === 2) {
        abrirModuloDatos();
        return;
    }

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
    actualizarAvatar("exito", "Tarjeta encontrada. Puede servir para desbloquear la salida.");

    abrirModal(
        "Caja abierta",
        "<p>La caja fuerte se abrió correctamente. Encontraste una tarjeta de acceso.</p>"
    );
}

function abrirPanelElectrico() {
    var contenido;

    if (estadoJuego.nivelActual === 2) {
        abrirPanelSeguridad();
        return;
    }

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
        actualizarAvatar("exito", "Energía restaurada. La computadora volvió a responder.");

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

    if (estadoJuego.nivelActual === 2) {
        abrirSalidaFinal();
        return;
    }

    if (estadoJuego.energiaRestaurada === false) {
        actualizarAvatar("pista", "La puerta no responde porque el sistema sigue sin energía.");
        abrirModal(
            "Puerta sin energía",
            "<p>La puerta principal no responde. Primero tenés que restaurar la energía desde el panel eléctrico.</p> "

        );
        return;
    }

    if (estadoJuego.tarjetaEncontrada === false) {
        actualizarAvatar("pista", "El lector pide una tarjeta de acceso. Revisá otros objetos.");
        abrirModal(
            "Acceso denegado",
            "<p>El lector de la puerta solicita una tarjeta de acceso. Buscá una forma de encontrarla dentro de la habitación.</p>"

        );
        return;
    }


    if (estadoJuego.computadoraDesbloqueada === false) {
        actualizarAvatar("pista", "La tarjeta sirve, pero la computadora todavía no habilitó la salida.");
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
   if (estadoJuego.nivelActual === 1) {
    if (estadoJuego.puertaAbierta === true) {
        return;
    }

    estadoJuego.puertaAbierta = true;
    completarObjetivo();
    iniciarNivelDos();
    return;
   }

   if (estadoJuego.puertaFinalAbierta === true) {
    return;
   }

   if (estadoJuego.puertaFinalAbierta === true) {
    return;
   }

   estadoJuego.puertaFinalAbierta = true;
   completarObjetivo();
   ganarPartida();
}


function abrirServidorCentral() {
    var contenido;

    if (estadoJuego.servidorActivado === true) {
        abrirModal(
            "Servidor central",
            "<p>El servidor central ya fue activado. El núcleo del sistema está respondiendo.</p>"
        );
        return;
    }

    contenido = "";
    contenido += "<p>El servidor central solicita una clave de administrador.</p>";
    contenido += "<p>Pista: <strong>El acceso raíz conserva el error del sistema.</strong></p>";
    contenido += "<div class='campo-modal'>";
    contenido += "<label for='input-clave-servidor'>Clave del servidor</label>";
    contenido += "<input type='text' id='input-clave-servidor' autocomplete='off'>";
    contenido += "<p id='error-clave-servidor' class='mensaje-error'></p>";
    contenido += "</div>";
    contenido += "<button id='boton-validar-servidor' class='boton boton-principal'>Activar servidor</button>";

    abrirModal("Servidor central", contenido);

    obtenerElemento("boton-validar-servidor").addEventListener("click", validarServidorCentral);

    obtenerElemento("input-clave-servidor").addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            validarServidorCentral();
        }
    });
}

function validarServidorCentral() {
    var inputClave;
    var errorClave;
    var claveIngresada;

    inputClave = obtenerElemento("input-clave-servidor");
    errorClave = obtenerElemento("error-clave-servidor");
    claveIngresada = inputClave.value.trim().toLowerCase();

    if (claveIngresada.length === 0) {
        errorClave.textContent = "Ingresá una clave para activar el servidor.";
        return;
    }

    if (claveIngresada !== "root404") {
        perderVida("Clave incorrecta. El servidor rechazó el acceso.");
        return;
    }

    estadoJuego.servidorActivado = true;
    completarObjetivo();
    actualizarAvatar("exito", "Servidor activado. El sistema principal volvió a responder.");

    abrirModal( 
        "Servidor activado",
        "<p>La clave fue aceptada. El servidor central quedó activo.</p>"
    );
}

function abrirModuloDatos() {
    var contenido;

    if (estadoJuego.moduloDatosResuelto === true) {
        abrirModal(
            "Módulo de datos",
            "<p>El módulo de datos ya fue reparado. La secuencia quedó estable.</p>"
        );
        return;
    }

    contenido = "";
    contenido += "<p>El módulo de datos muestra tres bloques corruptos: <strong>A, B y C</strong>.</p>";
    contenido += "<p>Pista: <strong>Primero se inicia el sistema, después se verifica y al final se libera.</strong></p>";
    contenido += "<p>Ingresá la secuencia correcta usando guiones. Ejemplo: A-B-C</p>";
    contenido += "<div class='campo-modal'>";
    contenido += "<label for='input-secuencia-datos'>Secuencia</label>";
    contenido += "<input type='text' id='input-secuencia-datos' autocomplete='off'>";
    contenido += "<p id='error-secuencia-datos' class='mensaje-error'></p>";
    contenido += "</div>";
    contenido += "<button id='boton-validar-datos' class='boton boton-principal'>Reparar datos</button>";

    abrirModal("Módulo de datos", contenido);

    obtenerElemento("boton-validar-datos").addEventListener("click", validarModuloDatos);

    obtenerElemento("input-secuencia-datos").addEventListener("keydown", function (evento) {
        if (evento.key === "Enter") {
            validarModuloDatos();
        }
    });
}

function validarModuloDatos() {
    var inputSecuencia;
    var errorSecuencia;
    var secuenciaIngresada;

    inputSecuencia = obtenerElemento("input-secuencia-datos");
    errorSecuencia = obtenerElemento("error-secuencia-datos");
    secuenciaIngresada = inputSecuencia.value.trim().toUpperCase();

    if (secuenciaIngresada.length === 0) {
        errorSecuencia.textContent = "Ingresá una secuencia para reparar los datos.";
        return;
    }

    if (secuenciaIngresada !== "A-C-B") {
        perderVida("Secuencia incorrecta. Los datos siguen corruptos.");
        return;
    }

    estadoJuego.moduloDatosResuelto = true;
    completarObjetivo();
    actualizarAvatar("exito", "Módulo reparado. Los datos vuelven a estar sincronizados.");

    abrirModal(
        "Datos reparados",
        "<p>La secuencia fue aceptada. El módulo de datos quedó sincronizado.</p>"
    );
}

function abrirPanelSeguridad() {
    var contenido;

    if (estadoJuego.panelSeguridadResuelto === true) {
        abrirModal(
            "Panel de seguridad",
            "<p>El panel de seguridad ya fue desactivado. El bloqueo final perdió fuerza.</p>"
        );
        return;
    }

    contenido = "";
    contenido += "<p>El panel de seguridad solicita un código de protocolo.</p>";
    contenido += "<p>Pista: <strong>El protocolo final fue creado el día 27 del mes 06.</strong></p>";
    contenido += "<div class='campo-modal'>";
    contenido += "<label for='input-codigo-seguridad'>Código de seguridad</label>";
    contenido += "<input type='text' id='input-codigo-seguridad' maxlength='4' autocomplete='off'>";
    contenido += "<p id='error-codigo-seguridad' class='mensaje-error'></p>";
    contenido += "</div>";
    contenido += "<button id='boton-validar-seguridad' class='boton boton-principal'>Desactivar bloqueo</button>";

    abrirModal("Panel de seguridad", contenido);

    obtenerElemento("boton-validar-seguridad").addEventListener("click", validarPanelSeguridad);

    obtenerElemento("input-codigo-seguridad").addEventListener("keydown", function(evento) {
        if (evento.key === "Enter") {
            validarPanelSeguridad();
        }
    });
}

function validarPanelSeguridad() {
    var inputCodigo;
    var errorCodigo;
    var codigoIngresado;

    inputCodigo = obtenerElemento("input-codigo-seguridad");
    errorCodigo = obtenerElemento("error-codigo-seguridad");
    codigoIngresado = inputCodigo.value.trim();

    if (codigoIngresado.length === 0) {
        errorCodigo.textContent = "Ingresá un código para desactivar el bloqueo.";
        return;
    }

    if (codigoIngresado !== "2706") {
        perderVida("Código incorrecto. El panel aumentó el nivel de bloqueo.");
        return;
    }

    estadoJuego.panelSeguridadResuelto = true;
    completarObjetivo();
    actualizarAvatar("exito", "Panel desactivado. La salida final ya puede verificarse.");

    abrirModal( 
        "Bloqueo desactivado",
        "<p>El código fue aceptado. El panel de seguridad quedó desactivado.</p>"
    );
}

function abrirSalidaFinal() {
    var contenido;

    if (estadoJuego.servidorActivado === false) {
        actualizarAvatar("pista", "La salida final necestia que el servidor centra esté activo.");

        abrirModal(
            "Salida bloqueada",
            "<p>El servidor central todavía no fue activado.</p>"
        );
        return;
    }

    if (estadoJuego.moduloDatosResuelto === false) {
        actualizarAvatar("pista", "Los datos siguen corruptos. Revisá el módulo de datos.");

        abrirModal(
            "Salida bloqueada",
            "<p>El módulo de datos todavía no fue reparado.</p>"
        );
        return;
    }

    if (estadoJuego.panelSeguridadResuelto === false) {
        actualizarAvatar("pista", "El panel de seguridad todavía mantiene el bloqueo final.");

        abrirModal(
            "Salida bloqueada",
            "<p>El panel de seguridad todavía está activo.</p>"
        );
        return;
    }

    contenido = "";
    contenido += "<p>Todos los sistemas fueron estabilizados.</p>";
    contenido += "<p>La salida final está lista para abrirse.</p>";
    contenido += "<div class='acciones-inicio'>";
    contenido += "<button id='boton-salida-final' class='boton boton-principa'>Escapar definitivamente</button>"
    contenido += "</div>";

    abrirModal("Salida final habilitada", contenido);

    obtenerElemento("boton-salida-final").addEventListener("click", completarEscape);
}