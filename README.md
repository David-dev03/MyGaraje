# MyGaraje

Web para llevar al día los mantenimientos de mis motos. Sirve para controlar los kilómetros, ver cuándo toca revisión y elegir si hacerla yo mismo viendo una guía o buscar un taller cercano.

## Backlog

Priorizado de lo imprescindible a las mejoras futuras:

- **[Alta]** Montar el menú de navegación enlazando todas las secciones (`index.html`, `anadir-moto.html`, `talleres.html`, `guia-tareas.html` y `login.html`).
- **[Alta]** Generar el listado de motos y el bloque de alertas desde JavaScript (`js/datos.js`), sin datos escritos a mano en el HTML.
- **[Alta]** Abrir la vista de detalle de una moto al pulsarla, mostrando su ficha técnica y su historial de mantenimientos.
- **[Media]** Convertir la navegación multipágina en una SPA sin recargar la página completa.
- **[Media]** Implementar el formulario de añadir moto validando los campos y el tipo de seguimiento (estimado u OBD).
- **[Media]** Listar talleres cercanos en `talleres.html` con filtro por zona y botón de cómo llegar.
- **[Media]** Mostrar las guías paso a paso en `guia-tareas.html` y permitir marcar tareas como completadas.
- **[Media]** Añadir filtros de búsqueda en el garaje (por marca, modelo o estado).
- **[Baja]** Permitir añadir, editar y eliminar motos y mantenimientos guardando todo en `localStorage`.
- **[Baja]** Simular el inicio de sesión y el registro de usuario en `login.html`.

## Mapa de pantallas

- **Inicio / Garaje (`index.html`):** Menú superior, listado de tarjetas de motos (modelo, año, kilómetros y estado), botón para añadir moto y bloque inferior de alertas pendientes.
- **Detalle de moto (`#vista-detalle` en `index.html`):** Ficha técnica completa de la moto seleccionada (imagen, matrícula, kilómetros actuales, aceite recomendado, tipo de seguimiento y estado) junto con su historial de mantenimientos y revisiones pendientes (fecha, km, modalidad, coste, estado y notas).
- **Añadir moto (`anadir-moto.html`):** Formulario para registrar una moto nueva (marca, modelo, año, matrícula, km actuales y elección entre cálculo estimado o sensor OBD). En construcción.
- **Mapa talleres (`talleres.html`):** Listado y mapa de talleres mecánicos cercanos con dirección, teléfono y botón para ver cómo llegar. En construcción.
- **Guía y tareas (`guia-tareas.html`):** Pantalla de mantenimiento paso a paso con vídeo explicativo, lista de herramientas necesarias, instrucciones y botón de tarea completada. En construcción.
- **Acceso (`login.html`):** Formularios de inicio de sesión (email, contraseña y botón de entrar) y creación de cuenta (nombre de usuario, email y contraseña). En construcción.