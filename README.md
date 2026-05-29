# La Habitación 404

**La Habitación 404** es un videojuego web tipo escape room desarrollado como proyecto final para la materia Desarrollo y Arquitectura Web.

El objetivo del juego es escapar de un sistema bloqueado resolviendo distintos puzzles, administrando el tiempo disponible, cuidando las vidas y avanzando entre niveles hasta encontrar la salida final.

## Descripción del juego

El jugador inicia dentro de una sala tecnológica bloqueada por un sistema de seguridad. Para escapar, debe explorar distintos objetos, resolver enigmas y desbloquear nuevas áreas.

El juego cuenta con dos niveles:

### Nivel 1: La Habitación 404

En este nivel el jugador debe resolver los primeros desafíos para abrir la puerta de la habitación.

Objetivos principales:

- Restaurar la energía desde el panel eléctrico.
- Abrir la caja fuerte.
- Obtener la tarjeta de acceso.
- Desbloquear la computadora.
- Abrir la puerta hacia el siguiente nivel.

### Nivel 2: Sala del Servidor

Luego de superar la primera sala, el jugador accede a una sala de servidor donde debe completar nuevos desafíos para escapar definitivamente.

Objetivos principales:

- Activar el servidor central.
- Reparar el módulo de datos.
- Desactivar el panel de seguridad.
- Abrir la salida final.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES5
- LocalStorage
- Flexbox
- Git y GitHub

## Funcionalidades principales

- Pantalla inicial animada.
- Menú principal.
- Validación del nombre del jugador.
- Selector de dificultad.
- Sistema de tiempo.
- Sistema de vidas.
- Sistema de progreso.
- Sistema de puntaje.
- Dos niveles jugables.
- Puzzles interactivos.
- Inventario dinámico.
- Avatar asistente con mensajes.
- Modales para instrucciones, puzzles, pausa, victoria y derrota.
- Reinicio de partida sin recargar la página.
- Ranking de jugadores.
- Historial de partidas.
- Sistema de logros.
- Modo claro y modo oscuro.
- Sonidos generados con JavaScript.
- Diseño responsive para escritorio, tablet y mobile.
- Página de contacto con validaciones JavaScript.
- Envío de mensaje mediante correo predeterminado y opción alternativa con Gmail.

## Dificultades

Antes de comenzar la partida, el jugador puede elegir el nivel de dificultad. Esta opción modifica las condiciones iniciales del juego, principalmente el tiempo disponible y la cantidad de vidas.

## Puzzles del juego

### Panel eléctrico

El jugador debe activar los interruptores según el patrón binario indicado por la pista.

Respuesta esperada:

ON-OFF-ON-ON

### Caja fuerte

El jugador debe ingresar el código relacionado con el error principal del juego.

Respuesta esperada:

0404

### Computadora

La terminal solicita una contraseña vinculada a la temática del error 404.

Respuesta esperada:

error404

### Servidor central

En el segundo nivel, el jugador debe activar el servidor con una clave de administrador.

Respuesta esperada:

root404

### Módulo de datos

El jugador debe ingresar una secuencia correcta para reparar los datos.

Respuesta esperada:

A-C-B

### Panel de seguridad 

El jugador debe ingresar el código del protocolo final.

Respuesta esperada:

2706

## LocalStorage

El proyecto utiliza LocalStorage para guardar información local en el navegador, como:

- Ranking de jugadores.
- Historial de partidas.
- Preferencia de modo claro u oscuro.
- Logros desbloqueados.

## Página de contacto

El proyecto incluye una página de contacto con un formulario que valida:

- Nombre alfanumérico.
- Mail válido.
- Mensaje con más de 5 caracteres.

Las validaciones se realizan exclusivamente con JavaScript y los errores se muestran de forma visual, sin utilizar alert.

Además, el formulario permite generar un envío mediante el correo predeterminado del sistema y ofrece una opción alternativa como Gmail.

## Organización del proyecto

habitacion-404/
│
├── index.html
├──README.md
├──.gitignore
│
├── css/
│   ├── reset.css
│   ├── style.css
│   ├── game.css
│   ├── modals.css
│   └── responsive.css
│
├── js/ 
│   ├── main.js
│   ├── game.js
│   ├── ui.js
│   ├── timer.js 
│   ├── puzzles.js
│   ├── storage.js
│   ├── validations.js
│   ├── contact.js
│   ├── sounds.js
│ 
├── assets/
│   └── images
│ 
└── docs/
    └── prompts-ia.md


## Cómo jugar 

1. Ingresar al juego desde index.html.
2. Elegir dificultad.
3. Presionar el botón Jugar.
4. Ingresar un nombre de jugador válido.
5. Explorar los objetos de la habitación.
6. Resolver los puzzles antes de que termine el tiempo.
7. Avanzar al segundo nivel.
8. Completar los desafíos de la sala del servidor.
9. Escapar definitivamente.

## Controles

- Click sobre objetos para interactuar.
- Teclar Enter para confirmar algunos códigos o respuestas.
- Botones en pantalla para pausar, reiniciar, ver instrucciones, ranking y logros.

## Autora 

Camila Perazzo

## Repositorio 
