"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var formularioContacto;

    formularioContacto = document.getElementById("formulario-contacto");

    if (formularioContacto !== null) {
        formularioContacto.addEventListener("submit", enviarFormularioContacto);
    }
});

function enviarFormularioContacto(evento) {
    var nombre;
    var mail;
    var mensaje;
    var resultadoNombre;
    var resultadoMail;
    var resultadoMensaje;
    var formularioValido;
    var asunto;
    var cuerpo;
    var enlaceMail;

    evento.preventDefault();

    nombre = document.getElementById("nombre-contacto").value;
    mail = document.getElementById("mail-contacto").value;
    mensaje = document.getElementById("mensaje-contacto").value;

    resultadoNombre = validarNombreContacto(nombre);
    resultadoMail = validarMailContacto(mail);
    resultadoMensaje = validarMensajeContacto(mensaje);

    document.getElementById("error-nombre-contacto").textContent = resultadoNombre.mensaje;
    document.getElementById("error-mail-contacto").textContent = resultadoMail.mensaje;
    document.getElementById("error-mensaje-contacto").textContent = resultadoMensaje.mensaje;

    formularioValido = resultadoNombre.valido === true &&
        resultadoMail.valido === true &&
        resultadoMensaje.valido === true;

    if (formularioValido === false) {
        return;
    }

    asunto = "Consulta sobre la Habitación 404";
    cuerpo = "Nombre: " + nombre.trim() + "\n";
    cuerpo += "Mail: " + mail.trim() + "\n\n";
    cuerpo += "Mensaje:\n" + mensaje.trim();

    enlaceMail = "mailto:camiltaperazzo@gmail.com";
    enlaceMail += "?subject=" + encodeURIComponent(asunto);
    enlaceMail += "&body=" + encodeURIComponent(cuerpo);

    window.location.href = enlaceMail;
}