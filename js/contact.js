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
    var enlaceMailto;
    var enlaceGmail;

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

    enlaceMailto = crearEnlaceMailto(asunto, cuerpo);
    enlaceGmail = crearEnlaceGmail(asunto, cuerpo);

    window.location.href = enlaceMailto;

    mostrarMensajeEnvioContacto(enlaceMailto, enlaceGmail);

   }

function crearEnlaceMailto(asunto, cuerpo) {
    var enlaceMailto;

    enlaceMailto = "mailto:camiltaperazzo@gmail.com";
    enlaceMailto += "?subject=" + encodeURIComponent(asunto);
    enlaceMailto += "&body=" + encodeURIComponent(cuerpo);

    return enlaceMailto;
}

function crearEnlaceGmail(asunto, cuerpo) {
    var enlaceGmail;

    enlaceGmail = "https://mail.google.com/mail/?view=cm&fs=1";
    enlaceGmail += "&to=" + encodeURIComponent("camiltaperazzo@gmail.com");
    enlaceGmail += "&su=" + encodeURIComponent(asunto);
    enlaceGmail += "&body=" + encodeURIComponent(cuerpo);

    return enlaceGmail;
}

function mostrarMensajeEnvioContacto(enlaceMailto, enlaceGmail) {
    var formularioContacto;
    var mensajeAnterior;
    var mensajeExito;

    formularioContacto = document.getElementById("formulario-contacto");
    mensajeAnterior = document.getElementById("mensaje-exito-contacto");

    if (mensajeAnterior !== null) {
        mensajeAnterior.parentNode.removeChild(mensajeAnterior);
    }

    mensajeExito = document.createElement("div");
    mensajeExito.id = "mensaje-exito-contacto";
    mensajeExito.className = "mensaje-exito-contacto";

    mensajeExito.innerHTML = "";
    mensajeExito.innerHTML += "<p>Si tu correo predeterminado no se abrió automáticamente, podés usar una de estas opciones:</p>";
    mensajeExito.innerHTML += "<div class='acciones-contacto'>";
    mensajeExito.innerHTML += "<a class='boton boton-secundario' href='" + enlaceMailto + "'>Intentar con correo predeterminado</a>";
    mensajeExito.innerHTML += "<a class='boton boton-principal' href='" + enlaceGmail + "' target='_blank'>Abrir con Gmail</a>";
    mensajeExito.innerHTML += "</div>";

    formularioContacto.appendChild(mensajeExito);
}