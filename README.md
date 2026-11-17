# MyGaraje

Web para llevar al día los mantenimientos de mis motos. Sirve para controlar los kilómetros, ver cuándo toca revisión y elegir si hacerla yo mismo viendo una guía o buscar un taller cercano.

## Backlog

Ordenado de lo primero que voy a programar a lo que dejaré para el final:

- Montar el menú y enlazar las páginas principales del diseño (`index.html`, añadir moto, talleres, guías y login).
- Sacar el listado de motos en la pantalla principal desde JavaScript (`datos.js`), sin meterlas a mano en el HTML.
- Al pinchar en una moto, abrir su ficha completa con sus datos y las alertas que tiene pendientes.
- Cambiar la navegación para que funcione como SPA sin recargar la página entera.
- Añadir filtros para buscar motos en el garaje o talleres por zona.
- Hacer que funcione el formulario de añadir moto (validando campos y eligiendo cálculo estimado o sensor OBD).
- Poder marcar tareas como completadas en la pantalla de guías y que sume los kilómetros.
- Guardar todo en `localStorage` para no perder los datos al cerrar el navegador.
- Simular el inicio de sesión y registro de usuario.

## Mapa de pantallas

- **Inicio / Mis motos (`index.html`):** Sale el menú arriba, las tarjetas con mis motos (modelo, km y estado) y abajo el bloque de alertas. Si pulsas en una moto se abre su ficha de detalle con todo su historial y revisiones pendientes.
- **Añadir moto (`anadir-moto.html`):** Formulario para meter una moto nueva con su matrícula, km actuales y el tipo de seguimiento (estimado o por OBD). De momento solo tiene la estructura base.
- **Mapa talleres (`talleres.html`):** Listado de talleres cercanos con dirección, teléfono y botón para ver cómo llegar. En construcción.
- **Guía y tareas (`guia-tareas.html`):** Pantalla para hacer un mantenimiento paso a paso (vídeo, herramientas necesarias, pasos y botón de completado). En construcción.
- **Login (`login.html`):** Pantallas de iniciar sesión y crear cuenta. En construcción.